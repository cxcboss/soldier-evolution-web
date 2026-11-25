import { build, context } from 'esbuild';
import { cp, mkdir, copyFile } from 'node:fs/promises';
import { watch } from 'node:fs';
const serve = process.argv.includes('--serve');
await mkdir('dist', { recursive: true });
async function publicFiles() {
  await Promise.all([
    copyFile('index.html', 'dist/index.html'),
    copyFile('game.css', 'dist/game.css'),
    cp('public', 'dist', { recursive: true }),
  ]);
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
  for (const item of ['index.html', 'game.css', 'public'])
    watch(item, { recursive: item === 'public' }, () => publicFiles().catch(console.error));
  await ctx.serve({ host: '0.0.0.0', port: 5187, servedir: 'dist' });
  console.log('试玩服务 http://localhost:5187');
} else {
  await build(options);
}
