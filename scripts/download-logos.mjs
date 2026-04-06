import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TICKERS = [
  'DYCA', 'CAPX', 'PGR', 'MOLA', 'MIRG', 'PATA', 'TECO2', 'FERR',
  'SAMI', 'IRCP', 'GAMI', 'DOME', 'INTR', 'MTR', 'FIPL', 'GARO',
  'SEMI', 'HARG', 'BPAT', 'RIGO', 'CVH', 'BBAR', 'LEDE', 'CELU',
  'CECO2',
];

const BASE_URL = 'https://assets.cocos.capital/cocos/logos';
const OUT_DIR = path.resolve(__dirname, '../assets/logos');

fs.mkdirSync(OUT_DIR, { recursive: true });

async function downloadLogo(ticker) {
  const url = `${BASE_URL}/${ticker}.jpg`;
  const dest = path.join(OUT_DIR, `${ticker}.webp`);

  const res = await fetch(url);

  if (!res.ok) {
    console.warn(`⚠️  ${ticker} — HTTP ${res.status}, skipped`);
    return;
  }

  const buffer = await res.arrayBuffer();
  // eslint-disable-next-line no-undef
  await sharp(Buffer.from(buffer)).webp({ quality: 80 }).toFile(dest);
  console.log(`✅  ${ticker}`);
}

async function main() {
  console.log(`Downloading ${TICKERS.length} logos to ${OUT_DIR}\n`);

  await Promise.all(TICKERS.map(downloadLogo));

  console.log('\nDone.');
}

main().catch(console.error);
