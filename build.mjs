import { build, context } from 'esbuild';
import { mkdir, copyFile, readdir, rm, writeFile } from 'node:fs/promises';
import { watch } from 'node:fs';
import path from 'node:path';

const serve = process.argv.includes('--serve');

// 仅拷贝运行时真正需要的美术资产，排除 20MB 未引用的预览视频与历史废图
const RUNTIME_ART = new Set([
  'ally-field.webp',
  'captain-field.webp',
  'grunt-field.webp',
  'brawler.glb',
  'convoy-keyart.webp',
  'expedition-chart.webp',
  'diver-skin.webp',
  'drill-skin.webp',
  'engine-skin.webp',
  'kestrel-skin.webp',
  'warden-skin.webp',
]);

await mkdir('dist/art', { recursive: true });

async function publicFiles() {
  await Promise.all([
    copyFile('index.html', 'dist/index.html'),
    copyFile('game.css', 'dist/game.css'),
    writeFile('dist/.nojekyll', ''),
  ]);
  const artFiles = await readdir('public/art');
  await Promise.all(
    artFiles
      .filter((name) => RUNTIME_ART.has(name))
      .map((name) => copyFile(path.join('public/art', name), path.join('dist/art', name))),
  );
  // 清理旧的未引用预览视频与废弃贴图，保持 dist 轻量干净
  await rm('dist/preview', { recursive: true, force: true });
  const distArt = await readdir('dist/art');
  await Promise.all(
    distArt
      .filter((name) => !RUNTIME_ART.has(name))
      .map((name) => rm(path.join('dist/art', name), { force: true })),
  );
}

await publicFiles();

const options = {
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'esm',
  target: ['es2020'],
  minify: true,
  outfile: 'dist/game.js',
  legalComments: 'eof',
  logLevel: 'info',
};

if (serve) {
  const ctx = await context(options);
  await ctx.watch();
  for (const item of ['index.html', 'game.css', 'public/art'])
    watch(item, { recursive: false }, () => publicFiles().catch(console.error));
  await ctx.serve({ host: '0.0.0.0', port: 5187, servedir: 'dist' });
  console.log('试玩服务 http://localhost:5187');
} else {
  await build(options);
}
