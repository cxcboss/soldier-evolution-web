"""Build the game's articulated brawler from the original 605 x 606 painted portrait.

Run with Python, Pillow, NumPy and SciPy. Front contours use the approved portrait's pixel coordinates. Horizontal
sections and texture projection use the generated side and back turnaround. The mesh, joint weights and baked atlas ship together in the GLB.
"""

import io
import json
import math
import struct
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy.interpolate import PchipInterpolator
from scipy.ndimage import distance_transform_edt

ART = Path(__file__).resolve().parents[1] / "public/art"
original = np.asarray(Image.open(ART / "boss.webp").convert("RGBA"))
turnaround = np.asarray(
    Image.open(Path(__file__).parent / "art/brawler-turnaround.webp").convert("RGBA")
)
# Horizontal contours follow the level side and back views. The original elevated
# front view supplies the face, jacket, belt, knuckles and boot paint.
SCALE_X, SCALE_Y, SCALE_Z = 0.00555, 0.00517, 0.00530
ATLAS_SIZE = 1536


def ease(a, b, value):
    t = np.clip((value - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


# Each front outline contains (image row, left, right). The rectangle places its paint in the atlas.
# fmt: off
parts = {
    "torso": ((0, 0, 700, 490), [
        (59,252,360), (67,233,384), (84,185,421), (105,125,476), (129,97,497),
        (166,102,488), (202,119,478), (242,146,451), (279,156,444), (312,161,439),
        (346,154,445), (372,175,426), (393,185,416), (407,203,399), (412,236,371)] ),
    "head": ((708, 0, 476, 302), [
        (50,266,343), (64,239,363), (89,230,375), (101,222,380), (110,217,385),
        (128,222,380), (140,229,374), (157,231,373), (179,234,371), (197,244,361),
        (212,256,348), (221,277,330), (231,297,312)] ),
    "quiff": ((708, 310, 474, 164), [
        (2,350,354), (6,339,357), (10,267,360), (17,244,366), (30,237,380),
        (42,232,383), (60,231,380), (77,230,368), (91,247,342), (101,282,318),
        (108,303,311)] ),
    "armL": ((0, 500, 430, 490), [
        (96,125,157), (106,101,187), (121,81,194), (147,62,194), (174,51,178),
        (204,44,162), (220,28,158), (247,11,159), (268,7,159), (281,12,154),
        (303,7,142), (330,5,127), (353,9,125), (367,12,148), (385,16,158),
        (402,20,161), (423,27,152), (450,38,144), (468,53,129), (478,68,120),
        (484,86,105), (485,94,98)] ),
    "armR": ((438, 500, 430, 490), [
        (97,450,476), (108,419,501), (128,410,521), (153,414,542), (179,431,555),
        (205,442,575), (223,444,586), (245,444,598), (267,445,602), (292,447,599),
        (307,455,591), (325,458,585), (347,454,580), (365,435,575), (388,419,568),
        (408,411,563), (433,414,558), (454,428,550), (474,449,532), (488,468,523),
        (493,484,505), (495,494,498)] ),
    "legL": ((876, 500, 308, 490), [
        (351,183,272), (371,168,294), (395,168,299), (421,172,300), (450,184,294),
        (476,176,294), (496,178,293), (507,193,280), (526,194,274), (548,191,274),
        (563,183,280), (583,184,290), (596,187,291), (602,205,272)] ),
    "legR": ((1192, 500, 310, 490), [
        (352,319,398), (369,298,414), (394,299,411), (413,300,405), (438,300,394),
        (460,303,383), (474,308,380), (496,305,376), (518,304,376), (529,315,373),
        (535,327,362)] ),
}
# fmt: on

# Low-frequency sculpture is independent of the baked highlights.
relief = {
    "head": [
        (302, 150, 15, 15, 28),
        (302, 135, 10, 21, 13),
        (268, 114, 22, 8, 12),
        (335, 114, 21, 8, 12),
        (257, 157, 25, 16, 10),
        (351, 157, 24, 16, 10),
        (302, 211, 19, 14, 16),
        (276, 134, 17, 8, -8),
        (330, 133, 16, 8, -8),
        (303, 177, 36, 6, -7),
    ],
    "quiff": [
        (258, 42, 12, 30, 9),
        (283, 43, 12, 36, 13),
        (315, 50, 16, 35, 14),
        (348, 40, 17, 20, 10),
    ],
    "torso": [
        (179, 170, 24, 73, 16),
        (422, 168, 23, 72, 15),
        (261, 265, 35, 24, 9),
        (344, 267, 33, 23, 9),
        (308, 377, 30, 15, 17),
        (154, 138, 13, 10, 10),
        (452, 138, 12, 10, 10),
    ],
    "armL": [(117, 400, 21, 27, 21), (70, 431, 27, 23, 12), (55, 309, 29, 36, 9)],
    "armR": [(447, 399, 21, 26, 23), (510, 439, 29, 23, 13), (554, 327, 28, 35, 10)],
}
# (height in turnaround, left/right in the rear view, front/back in the side view).
# The X columns are unmirrored during baking; world +Z faces the player.

# fmt: off
body = [
 (166,1289,1376,479,531),(174,1240,1428,461,558),(194,1206,1461,422,576),
 (214,1175,1491,391,591),(237,1140,1526,363,605),(259,1118,1549,338,618),
 (284,1110,1558,314,623),(307,1123,1544,295,622),(340,1146,1520,278,616),
 (373,1162,1502,274,607),(411,1177,1490,278,600),(459,1187,1477,281,584),
 (490,1185,1483,282,570),(509,1191,1477,288,553),(527,1200,1468,293,542),
 (542,1205,1463,301,532),(550,1248,1418,340,496)]
face = [
 (66,1280,1387,355,472),(84,1257,1409,325,490),(111,1241,1424,317,510),
 (137,1236,1430,313,511),(153,1230,1436,318,507),(174,1235,1432,308,498),
 (188,1244,1423,306,487),(206,1247,1420,314,471),(224,1255,1412,312,450),
 (243,1269,1396,305,420),(258,1280,1385,311,396),(268,1310,1355,322,365)]
hair = [
 (8,1360,1365,397,403),(13,1329,1377,360,421),(20,1275,1392,314,449),(27,1260,1409,294,473),
 (45,1244,1421,277,494),(70,1239,1428,273,510),(93,1240,1429,287,519),
 (113,1245,1425,319,522),(134,1251,1420,379,522),(154,1258,1413,424,516),
 (174,1279,1396,456,505),(185,1310,1363,473,489)]
arm = [
 (235,1131,1182,479,550),(247,1105,1195,463,575),(267,1080,1201,444,601),
 (294,1065,1195,426,621),(328,1054,1187,418,631),(351,1043,1181,417,632),
 (369,1032,1182,416,640),(395,1018,1183,426,645),(414,1014,1176,437,639),
 (439,1008,1164,447,626),(470,997,1154,454,621),(498,989,1147,452,613),
 (529,986,1137,452,596),(555,983,1121,440,582),(577,978,1119,420,575),
 (604,974,1127,403,574),(633,973,1131,397,575),(651,976,1125,405,571),
 (671,985,1116,421,557),(686,1007,1103,444,536),(696,1039,1076,468,513),
 (699,1052,1064,482,495)]
leg = [
 (510,1242,1299,384,483),(530,1218,1324,339,517),(551,1191,1331,319,535),
 (581,1180,1335,313,545),(621,1176,1331,317,548),(658,1174,1327,328,538),
 (692,1164,1321,346,520),(718,1153,1315,345,525),(743,1158,1304,358,528),
 (758,1167,1290,377,510),(783,1167,1281,375,494),(808,1155,1282,362,497),
 (827,1139,1285,337,506),(848,1127,1286,312,523),(866,1124,1285,293,531),
 (875,1125,1284,293,534),(879,1138,1278,303,519)]
shells = {"torso":body,"head":face,"quiff":hair,"armL":arm,"armR":arm,"legL":leg,"legR":leg}
registration = {
 "torso":[(166,59),(214,81),(259,106),(309,155),(350,202),(411,263),(462,315),(496,351),(519,376),(550,412)],
 "head":[(66,50),(93,72),(124,101),(152,125),(178,147),(195,159),(216,180),(242,204),(268,231)],
 "quiff":[(11,3),(30,13),(49,26),(77,43),(100,57),(125,76),(150,92),(185,108)],
 "armL":[(235,96),(294,140),(351,200),(395,244),(430,286),(495,315),(560,353),(603,380),(647,420),(699,485)],
 "armR":[(235,97),(294,151),(351,207),(395,254),(430,305),(495,333),(560,365),(603,389),(647,430),(699,495)],
 "legL":[(510,351),(550,386),(625,426),(718,475),(758,507),(813,548),(879,602)],
 "legR":[(510,352),(550,378),(625,413),(718,453),(758,477),(813,505),(879,535)]}
# fmt: on


def front_row(name, height):
    markers = np.asarray(registration[name])
    return np.interp(height, markers[:, 0], markers[:, 1])


def world_point(bx, row, sx):
    return np.array(
        [(bx - 1334) * SCALE_X, max(0.008, (879 - row) * SCALE_Y), (445 - sx) * SCALE_Z]
    )


# Hierarchy and inverse binds are explicit so the runtime can pose the same rig in every art mode.
joints, parents, names, joint_centers = [], [], {}, []


def joint(name, parent, x, row, z):
    names[name] = len(joints)
    joints.append(name)
    parents.append(names[parent] if parent else None)
    joint_centers.append(world_point(x, row, z))


joint("Pelvis", None, 1334, 546, 444)
joint("Spine", "Pelvis", 1334, 499, 449)
joint("Head", "Spine", 1334, 244, 422)
for hand, mirror in [("L", False), ("R", True)]:

    def bx(value):
        return 2668 - value if mirror else value

    joint("Arm" + hand, "Spine", bx(1156), 272, 509)
    joint("Elbow" + hand, "Arm" + hand, bx(1083), 442, 533)
    joint("Wrist" + hand, "Elbow" + hand, bx(1045), 574, 499)
    joint("Hip" + hand, "Pelvis", bx(1258), 553, 432)
    joint("Knee" + hand, "Hip" + hand, bx(1236), 714, 425)
    joint("Ankle" + hand, "Knee" + hand, bx(1222), 805, 438)


def skin(part, v):
    if part in ("head", "quiff"):
        return ["Head"], [1.0]
    if part == "torso":
        t = ease(448, 536, v)
        return ["Spine", "Pelvis"], [1 - t, t]
    side = part[-1]
    if part.startswith("arm"):
        e, w = ease(402, 478, v), ease(551, 611, v)
        return ["Arm" + side, "Elbow" + side, "Wrist" + side], [1 - e, e - w, w]
    k, a = ease(678, 749, v), ease(778, 828, v)
    return ["Hip" + side, "Knee" + side, "Ankle" + side], [1 - k, k - a, a]


def torso_paint_row(height, x, row):
    center = 1 - ease(84, 134, np.abs(x - 302))
    chest = np.interp(
        height,
        [166, 218, 259, 288, 312, 334, 389, 445, 489, 519, 550],
        [226, 232, 242, 258, 279, 289, 311, 330, 353, 378, 406],
    )
    return row * (1 - center) + chest * center


def bake_strip(name, spec, contour):
    (_, _, width, height), rings = spec
    vmin, vmax = rings[0][0], rings[-1][0]
    # Trim occluded regions before filling them; no repeated eyes underneath the chin
    # or painted fists stuck on the jacket when the character raises his arms.
    yy, xx = np.indices(original.shape[:2])
    left, right = contour(np.clip(yy, vmin, vmax)).transpose(2, 0, 1)
    mask = (
        (original[:, :, 3] > 200)
        & (yy >= vmin)
        & (yy <= vmax)
        & (xx >= left)
        & (xx <= right)
    )
    if name == "torso":
        for other in ["head", "quiff", "armL", "armR"]:
            rings2 = np.asarray(parts[other][1])
            row = np.clip(yy, rings2[0, 0], rings2[-1, 0])
            hidden_left = np.interp(row, rings2[:, 0], rings2[:, 1])
            hidden_right = np.interp(row, rings2[:, 0], rings2[:, 2])
            mask &= ~(
                (yy >= rings2[0, 0])
                & (yy <= rings2[-1, 0])
                & (xx > hidden_left - 1)
                & (xx < hidden_right + 1)
            )
    if name.startswith("leg"):
        # The belt and the tails of the jacket overlap the top of both pant legs.
        neutral = original[:, :, :3].astype(float)
        mask &= (yy > 407) | (
            (neutral[:, :, 0] < 112) & (neutral[:, :, 0] < neutral[:, :, 2] * 1.35 + 3)
        )
    iy, ix = distance_transform_edt(~mask, return_distances=False, return_indices=True)
    source = original[iy, ix, :3]
    shell = np.asarray(shells[name])
    geometry = PchipInterpolator(shell[:, 0], shell[:, 1:], axis=0)
    h = np.linspace(shell[0, 0], shell[-1, 0], height)
    v = front_row(name, h)[:, None]
    th = np.linspace(-np.pi, np.pi, width)[None, :]
    left_edge, right_edge = contour(v[:, 0].clip(vmin, vmax)).T
    u = (
        (left_edge + right_edge)[:, None]
        + (right_edge - left_edge)[:, None] * np.sin(th)
    ) / 2

    def sample(im, x, y):
        x = np.clip(x, 0, im.shape[1] - 1.01)
        y = np.clip(y, 0, im.shape[0] - 1.01)
        xi = x.astype(int)
        yi = y.astype(int)
        fx = (x - xi)[..., None]
        fy = (y - yi)[..., None]
        return (1 - fy) * ((1 - fx) * im[yi, xi, :3] + fx * im[yi, xi + 1, :3]) + fy * (
            (1 - fx) * im[yi + 1, xi, :3] + fx * im[yi + 1, xi + 1, :3]
        )

    fv = v
    if name == "torso":
        fv = torso_paint_row(h[:, None], u, v)
    if name.startswith("leg"):
        fv = np.maximum(415 if name == "legL" else 399, v)
    paint = sample(source, u, fv)
    if name == "quiff":
        crown = sample(source, 302 + 48 * np.sin(th), 46 - 16 * np.cos(th))
        blend = (1 - ease(13, 50, h))[:, None, None]
        paint = paint * (1 - blend) + crown * blend
    bl, br, sf, sb = geometry(h).T
    if name.endswith("R"):
        bl, br = 2668 - br, 2668 - bl
    # Each camera contributes where the normal faces it. The side camera also
    # supplies the inward-facing sleeve and the palm when the fists are raised.
    rear_x = 2668 - ((bl + br)[:, None] + (br - bl)[:, None] * np.sin(th)) / 2
    sx = ((sf + sb)[:, None] - (sb - sf)[:, None] * np.cos(th)) / 2
    side = sample(views_paint, sx, h[:, None])
    back = sample(views_paint, rear_x, h[:, None])
    cosine = np.cos(th)
    front = ease(0.21, 0.67, cosine)[..., None]
    rear = ease(0.18, 0.7, -cosine)[..., None]
    if name == "torso":
        # The arm occludes the side of the jacket in the profile photograph.
        hide = ease(295, 376, h)[:, None, None]
        side = side * (1 - hide) + back * hide
    if name.startswith("leg"):
        hide = 1 - ease(676, 719, h)[:, None, None]
        side = side * (1 - hide) + back * hide
    if name == "head":
        # Only hair, ears and the top of the collar are visible from behind.
        sideSkin = sample(
            views_paint, np.clip(sx, 320, 413), np.clip(h[:, None], 131, 229)
        )
        back = (
            back * (1 - ease(152, 187, h)[:, None, None])
            + sideSkin * ease(152, 187, h)[:, None, None]
        )
    final = paint * front + back * rear + side * (1 - front - rear)
    return Image.fromarray(np.uint8(np.clip(final, 0, 255)))


def material_strip(name, image):
    """Author roughness and metallic by surface rather than embossing painted shadows."""
    colors = np.asarray(image, dtype=float) / 255.0
    red, green, blue = colors.transpose(2, 0, 1)
    leather = ease(0.08, 0.32, red - green) * ease(0.04, 0.24, green - blue + 0.12)
    skin = ease(0.32, 0.64, green / np.maximum(red, 0.02))
    if name == "quiff":
        rough = np.full_like(red, 0.43)
    elif name == "head":
        rough = 0.58 - 0.14 * ease(0.1, 0.36, green - blue)
    elif name.startswith("arm"):
        rough = 0.39 + 0.21 * skin
    else:
        rough = 0.83 - 0.47 * leather
    packed = np.zeros_like(colors)
    packed[:, :, 0] = 1
    packed[:, :, 1] = rough
    return Image.fromarray(np.uint8(packed * 255))


def sculpt_surface(name, sn, cs, x, v, row):
    """Broad forms follow the turnaround, smaller cuts follow the painted front."""
    front = max(0.0, cs) ** 1.6

    def bell(value, mid, width):
        return math.exp(-0.5 * ((value - mid) / width) ** 2)

    if name == "torso":
        # Roll the lapels away from the shirt, break the collar at its notch,
        # lift the hem away from the belt and pick out the sternum under the vest.
        edge = np.interp(v, [185, 232, 284, 364, 462, 520], [95, 101, 114, 90, 78, 86])
        side = abs(x - 302)
        lip = 17 * bell(side, edge, 8.5) - 6 * bell(side, edge - 11, 4.5)
        lapel = lip * ease(172, 219, v) * (1 - ease(474, 536, v))
        chest = 9.0 * bell(side, 36, 23) * bell(v, 344, 32)
        hem = 7 * bell(v, 516, 5) + 4 * bell(v, 475, 5)
        return front * (lapel + chest) + hem
    if name == "head":
        brow = 115 + 0.22 * (24 - abs(x - 302))
        brow_ridge = bell(row, brow, 4.8) * bell(abs(x - 302), 32, 15)
        lip = bell(row, 168 + 0.055 * abs(x - 302), 2.8) * bell(x, 302, 23)
        chin = bell(row, 208, 11) * bell(x, 302, 19)
        return front * (11 * brow_ridge + 5 * lip + 7 * chin)
    if name == "quiff":
        locks = math.cos(11 * math.asin(sn) - row * 0.040 + 0.7 * cs)
        return (6 * locks + 3 * locks * abs(locks)) * bell(v, 81, 40)
    if name.startswith("arm"):
        # An actual sleeve lip, thumb and distinct knuckle arc remain legible as the fist turns.
        sleeve = 7 * bell(v, 382 - 14 * sn, 6) - 4 * bell(v, 393 - 14 * sn, 5)
        u = sn if name == "armL" else -sn
        thumb = 18 * bell(v, 606 + 21 * u, 19) * bell(u, 0.58, 0.25)
        knuckles = sum(
            bell(u, centre, 0.17) * bell(v, 648 + 13 * u, 11)
            for centre in (-0.73, -0.27, 0.18, 0.62)
        )
        return sleeve + front * (thumb + 13 * knuckles)
    # Outsole and padded boot collar, with cloth gathered above the knee.
    return (
        6 * bell(v, 867, 4.7)
        + 4.3 * bell(v, 810 + 5 * sn, 5)
        + front * 5 * bell(v, 716 - 11 * sn, 7)
    )


# Extend transparent edge texels for filtered texture samples.
ty, tx = distance_transform_edt(
    turnaround[:, :, 3] < 160, return_distances=False, return_indices=True
)
views_paint = turnaround[ty, tx, :3]

positions, texcoords, bone_ids, weights, indices, seams = [], [], [], [], [], []
atlas = Image.new("RGB", (ATLAS_SIZE, ATLAS_SIZE), (165, 49, 43))
material_atlas = Image.new("RGB", atlas.size, (255, 175, 0))
for name, spec in parts.items():
    (ax, ay, width, height), rows = spec
    rings = np.array(rows)
    contour = PchipInterpolator(rings[:, 0], rings[:, 1:], axis=0)
    strip = bake_strip(name, spec, contour)
    atlas.paste(strip, (ax, ay))
    material_atlas.paste(material_strip(name, strip), (ax, ay))
    shell = np.asarray(shells[name])
    volume = PchipInterpolator(shell[:, 0], shell[:, 1:], axis=0)
    rows_v = np.unique(
        np.r_[
            shell[:, 0],
            np.linspace(
                shell[0, 0], shell[-1, 0], 57 if name in ("head", "quiff") else 49
            ),
        ]
    )
    cols = 72 if name in ("quiff", "head", "torso") else 48
    first = len(positions)
    for j, v in enumerate(rows_v):
        seams.append((len(positions), len(positions) + cols))
        front_v = front_row(name, v)
        left, right = contour(np.clip(front_v, rings[0, 0], rings[-1, 0]))
        bl, br, sf, sb = volume(v)
        if name.endswith("R"):
            bl, br = 2668 - br, 2668 - bl
        for i in range(cols + 1):
            angle = i * math.tau / cols - math.pi
            sn = math.sin(angle)
            cs = math.cos(angle)
            x = (left + right) / 2 + (right - left) / 2 * sn
            bx = (bl + br) / 2 + (br - bl) / 2 * sn
            sx = (sf + sb) / 2 - (sb - sf) / 2 * cs
            extra = sum(
                h * math.exp(-0.5 * (((x - cx) / dx) ** 2 + ((front_v - cy) / dy) ** 2))
                for cx, cy, dx, dy, h in relief.get(name, [])
            )
            sx -= max(0, cs) ** 2 * extra
            if name.startswith("arm"):
                # The four folded fingers make shallow lobes across the palm.
                ridge = math.exp(-0.5 * ((v - 647) / 24) ** 2)
                fingers = sum(
                    math.exp(-0.5 * ((sn - k) / 0.151) ** 2)
                    for k in [-0.73, -0.24, 0.24, 0.72]
                )
                sx -= min(0, cs) * fingers * 11 * ridge
            row = v
            if name == "torso":
                # The front neckline drops below the chin, while the back collar stands up.
                row += (
                    max(0, 280 - v)
                    * max(0, cs) ** 1.5
                    * (1 - ease(34, 117, abs(bx - 1334)))
                )
            if name == "quiff":
                dome = 1 - ease(44, 136, v)
                wave = 0.5 + 0.5 * math.cos((bx - 1250) * 0.087 + v * 0.049 + 0.8 * cs)
                row -= 10.5 * dome * wave
                row += 24 * max(0, cs) ** 6 * math.exp(-0.5 * ((v - 108) / 22) ** 2)
                sx -= 8 * max(0, cs) * wave * ease(15, 48, v) * (1 - ease(96, 151, v))
            depth = sculpt_surface(name, sn, cs, x, v, front_v)
            bx += sn * depth * 0.43
            sx -= cs * depth
            pos = world_point(bx, row, sx)
            positions.append(pos)
            texcoords.append(
                [
                    (ax + 0.5 + (width - 1) * i / cols) / ATLAS_SIZE,
                    (
                        ay
                        + 0.5
                        + (height - 1)
                        * (v - shell[0, 0])
                        / (shell[-1, 0] - shell[0, 0])
                    )
                    / ATLAS_SIZE,
                ]
            )
            js, ws = skin(name, v)
            bone_ids.append([names[b] for b in js] + [0] * (4 - len(js)))
            weights.append(list(ws) + [0.0] * (4 - len(ws)))
            if j and i:
                a = len(positions) - 1
                b = a - 1
                c = a - cols - 1
                d = c - 1
                indices.extend([d, b, c, c, b, a])
    last_ring = len(positions) - cols - 1
    for start, reverse in [(first, True), (last_ring, False)]:
        for i in range(1, cols - 1):
            a, b, c = start, start + i, start + i + 1
            indices.extend([a, b, c] if reverse else [a, c, b])

    if name == "torso":
        # The four embossed brass snaps use the same draw call and skin weights as their panel.
        gold_uv = (1250 / ATLAS_SIZE, 1100 / ATLAS_SIZE)
        for source_x, source_row, radius in [
            (150, 138, 0.056),
            (452, 138, 0.056),
            (196, 341, 0.060),
            (406, 341, 0.060),
        ]:
            candidates = []
            for j, v in enumerate(rows_v):
                y = front_row(name, v)
                left, right = contour(np.clip(y, rings[0, 0], rings[-1, 0]))
                for i in range(cols // 4, 3 * cols // 4 + 1):
                    angle = 2 * math.pi * i / cols - math.pi
                    x = 0.5 * (left + right + (right - left) * math.sin(angle))
                    y_paint = torso_paint_row(v, x, y)
                    candidates.append(
                        ((x - source_x) ** 2 + (y_paint - source_row) ** 2, j, i)
                    )
            _, j, i = min(candidates)
            k = first + j * (cols + 1) + i
            dx = positions[k + 1] - positions[k - 1]
            dy = positions[k - (cols + 1)] - positions[k + (cols + 1)]
            normal = np.cross(dx, dy)
            normal /= np.linalg.norm(normal)
            dx /= np.linalg.norm(dx)
            dy = np.cross(normal, dx)
            start = len(positions)
            for ringsize, lift in [
                (1.0, -0.006),
                (0.98, 0.010),
                (0.72, 0.032),
                (0.02, 0.040),
            ]:
                for f in range(12):
                    angle = math.tau * f / 12
                    positions.append(
                        positions[k]
                        + normal * lift
                        + radius
                        * ringsize
                        * (dx * math.cos(angle) + dy * math.sin(angle))
                    )
                    texcoords.append(gold_uv)
                    bone_ids.append(bone_ids[k])
                    weights.append(weights[k])
            for ring in range(3):
                for f in range(12):
                    a = start + ring * 12 + f
                    b = start + ring * 12 + ((f + 1) % 12)
                    indices.extend([a, b, a + 12, b, b + 12, a + 12])

ImageDraw.Draw(atlas).rectangle((1234, 1084, 1266, 1116), fill=(243, 183, 52))
ImageDraw.Draw(material_atlas).rectangle((1234, 1084, 1266, 1116), fill=(255, 90, 115))

positions = np.asarray(positions, dtype=np.float32)
tri = np.asarray(indices).reshape(-1, 3)
normals = np.zeros_like(positions)
n = np.cross(
    positions[tri[:, 1]] - positions[tri[:, 0]],
    positions[tri[:, 2]] - positions[tri[:, 0]],
)
for j in range(3):
    np.add.at(normals, tri[:, j], n)
for a, b in seams:
    normals[a] = normals[b] = normals[a] + normals[b]
normals /= np.maximum(1e-8, np.linalg.norm(normals, axis=1)[:, None])

# Portable glTF 2.0; no runtime model tools or external texture requests.
blob = bytearray()
views = []
access = []


def buffer_view(data, target=None):
    while len(blob) % 4:
        blob.append(0)
    offset = len(blob)
    blob.extend(data)
    record = {"buffer": 0, "byteOffset": offset, "byteLength": len(data)}
    if target:
        record["target"] = target
    views.append(record)
    return len(views) - 1


def attribute(
    data, dtype, component, kind, target=None, bounds=False, normalized=False
):
    array = np.asarray(data, dtype=dtype)
    a = {
        "bufferView": buffer_view(array.tobytes(), target),
        "componentType": component,
        "type": kind,
        "count": len(array),
    }
    if normalized:
        a["normalized"] = True
    if bounds:
        a.update(min=array.min(axis=0).tolist(), max=array.max(axis=0).tolist())
    access.append(a)
    return len(access) - 1


# Joint weights must sum to one after 8-bit normalization.
packed_weights = np.rint(np.asarray(weights) * 255).astype(int)
packed_weights[np.arange(len(weights)), packed_weights.argmax(axis=1)] += (
    255 - packed_weights.sum(axis=1)
)
packed_uv = np.rint(np.asarray(texcoords) * 65535)
attrs = {
    "POSITION": attribute(positions, "<f4", 5126, "VEC3", 34962, True),
    "NORMAL": attribute(normals, "<f4", 5126, "VEC3", 34962),
    "TEXCOORD_0": attribute(packed_uv, "<u2", 5123, "VEC2", 34962, normalized=True),
    "JOINTS_0": attribute(bone_ids, "u1", 5121, "VEC4", 34962),
    "WEIGHTS_0": attribute(packed_weights, "u1", 5121, "VEC4", 34962, normalized=True),
}
index = attribute(indices, "<u2", 5123, "SCALAR", 34963)
inverse = []
nodes = []
for i, name in enumerate(joints):
    center = joint_centers[i]
    parent = parents[i]
    delta = center if parent is None else center - joint_centers[parent]
    node = {"name": name, "translation": delta.tolist()}
    children = [j for j, p in enumerate(parents) if p == i]
    if children:
        node["children"] = children
    nodes.append(node)
    matrix = np.eye(4)
    matrix[:3, 3] = -center
    inverse.append(matrix.T.ravel())
bind = attribute(inverse, "<f4", 5126, "MAT4")
image = io.BytesIO()
atlas.save(image, "JPEG", quality=90, subsampling=0, optimize=True)
image_view = buffer_view(image.getvalue())
surface_image = io.BytesIO()
material_atlas.resize((768, 768), Image.Resampling.LANCZOS).save(
    surface_image, "PNG", optimize=True
)
surface_view = buffer_view(surface_image.getvalue())
mesh_node = len(nodes)
nodes.append({"name": "Brawler", "mesh": 0, "skin": 0})
doc = {
    "asset": {"version": "2.0", "generator": "Soldier Evolution portrait rig"},
    "scene": 0,
    "scenes": [{"nodes": [0, mesh_node]}],
    "nodes": nodes,
    "skins": [
        {
            "name": "BrawlerRig",
            "inverseBindMatrices": bind,
            "skeleton": 0,
            "joints": list(range(len(joints))),
        }
    ],
    "meshes": [
        {"primitives": [{"attributes": attrs, "indices": index, "material": 0}]}
    ],
    "materials": [
        {
            "name": "Painted leather, skin and cloth",
            "pbrMetallicRoughness": {
                "baseColorTexture": {"index": 0},
                "metallicRoughnessTexture": {"index": 1},
                "metallicFactor": 1,
                "roughnessFactor": 1,
            },
        }
    ],
    "textures": [{"source": 0}, {"source": 1}],
    "images": [
        {"bufferView": image_view, "mimeType": "image/jpeg"},
        {"bufferView": surface_view, "mimeType": "image/png"},
    ],
    "bufferViews": views,
    "accessors": access,
    "buffers": [{"byteLength": len(blob)}],
}
header = json.dumps(doc, separators=(",", ":")).encode()
header += b" " * (-len(header) % 4)
blob += b"\x00" * (-len(blob) % 4)
out = ART / "brawler.glb"
with out.open("wb") as f:
    f.write(struct.pack("<4sII", b"glTF", 2, 28 + len(header) + len(blob)))
    f.write(struct.pack("<I4s", len(header), b"JSON") + header)
    f.write(struct.pack("<I4s", len(blob), b"BIN\x00") + blob)
print(
    f"{out.name}: {len(positions):,} vertices, {len(tri):,} triangles, {len(joints)} joints, {out.stat().st_size:,} bytes"
)
