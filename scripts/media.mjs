/**
 * Asset pipeline.
 *
 *   node scripts/media.mjs images        compress photography to WebP
 *   node scripts/media.mjs reel <file>   prepare an Instagram reel for the web
 *
 * Photographs ship as WebP because the source PNGs are between 1 and 10 MB
 * each. Logos stay PNG — they are already small and need the alpha channel.
 *
 * Reels downloaded from Instagram have their `moov` atom at the end of the
 * file, so a browser must fetch the whole thing before it can paint a single
 * frame. Every clip has to be re-encoded with `+faststart` before it goes on
 * the page.
 */
import { spawnSync } from 'node:child_process';
import { readdir, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const IMAGES_DIR = 'src/assets/images';
const REELS_DIR = 'src/assets/reels';

/** Long-edge cap. Above this, a photograph costs bandwidth without looking better. */
const MAX_EDGE = 2000;
const WEBP_QUALITY = 78;

/** Logos need alpha and are already tiny; leave them alone. */
const KEEP_AS_PNG = new Set(['aca.png', 'UNMDP.png', 'punta-iglesia.png']);

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function convertImages() {
  const entries = await readdir(IMAGES_DIR);
  const targets = entries.filter((f) => /\.(png|jpe?g)$/i.test(f) && !KEEP_AS_PNG.has(f));

  if (targets.length === 0) {
    console.log('Nothing to convert.');
    return;
  }

  let before = 0;
  let after = 0;

  for (const file of targets) {
    const from = path.join(IMAGES_DIR, file);
    const to = path.join(IMAGES_DIR, `${path.parse(file).name}.webp`);

    const original = (await stat(from)).size;
    await sharp(from)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 5 })
      .toFile(to);
    const converted = (await stat(to)).size;

    before += original;
    after += converted;
    const saved = Math.round((1 - converted / original) * 100);
    console.log(`${file.padEnd(28)} ${kb(original).padStart(9)} -> ${kb(converted).padStart(9)}  (-${saved}%)`);
  }

  console.log(`\nTotal ${kb(before)} -> ${kb(after)} (-${Math.round((1 - after / before) * 100)}%)`);
  console.log('Update the imports in src/data and src/components to the .webp files,');
  console.log('then delete the original PNGs once nothing references them.');
}

function run(args) {
  const result = spawnSync(ffmpegPath, args, { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${args.join(' ')}`);
}

/**
 * Produces the three artefacts a reel card needs: a short muted loop that can
 * autoplay cheaply, the full clip with faststart, and a poster frame.
 */
async function prepareReel(source, slug, { loopSeconds = 8.5, fullSeconds, posterAt = 1.5 } = {}) {
  await mkdir(REELS_DIR, { recursive: true });
  const out = (suffix) => path.join(REELS_DIR, `${slug}${suffix}`);

  run([
    '-v', 'error', '-y', '-i', source,
    ...(fullSeconds ? ['-t', String(fullSeconds)] : []),
    '-c:v', 'libx264', '-profile:v', 'main', '-crf', '26', '-preset', 'slow',
    '-vf', 'scale=720:-2',
    '-c:a', 'aac', '-b:a', '96k',
    '-movflags', '+faststart',
    out('.mp4'),
  ]);

  run([
    '-v', 'error', '-y', '-i', source,
    '-t', String(loopSeconds), '-an',
    '-c:v', 'libx264', '-profile:v', 'main', '-crf', '30', '-preset', 'slow',
    '-vf', 'scale=480:-2',
    '-movflags', '+faststart',
    out('.loop.mp4'),
  ]);

  run([
    '-v', 'error', '-y', '-ss', String(posterAt), '-i', source,
    '-frames:v', '1', '-vf', 'scale=480:-2', '-q:v', '6',
    out('.jpg'),
  ]);

  for (const suffix of ['.mp4', '.loop.mp4', '.jpg']) {
    console.log(`${slug}${suffix.padEnd(10)} ${kb((await stat(out(suffix))).size)}`);
  }
}

const [command, ...rest] = process.argv.slice(2);

if (command === 'images') {
  await convertImages();
} else if (command === 'reel') {
  const [source, slug] = rest;
  if (!source || !slug) {
    console.error('Usage: node scripts/media.mjs reel <archivo.mp4> <slug>');
    process.exit(1);
  }
  await prepareReel(source, slug);
} else {
  console.error('Usage: node scripts/media.mjs images | reel <archivo> <slug>');
  process.exit(1);
}
