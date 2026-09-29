// Builds the share image and the touch icon. Run once: node scripts/seo-assets.cjs
const s = require('sharp');
const SRC = 'C:/Users/Facundo Amores/Downloads/Fotos LemmiArquitectura/_DSC9437.jpg';
(async () => {
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#09090b" stop-opacity="0.92"/><stop offset="0.6" stop-color="#09090b" stop-opacity="0.55"/><stop offset="1" stop-color="#09090b" stop-opacity="0.1"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="72" y="300" font-family="Arial, Helvetica, sans-serif" font-size="92" letter-spacing="14" fill="#fff">LEMMI</text>
    <text x="72" y="368" font-family="Arial, Helvetica, sans-serif" font-size="46" fill="#fff">arquitectura</text>
    <text x="72" y="450" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#e4e4e7">Estudio de arquitectura en Mar del Plata</text>
    <text x="72" y="494" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#a1a1aa">Vender · Comprar · Construir</text>
  </svg>`);
  await s(SRC, { limitInputPixels: false }).rotate().resize(1200, 630, { fit: 'cover', position: 'attention' })
    .composite([{ input: overlay }]).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og-image.jpg');
  await s('public/favicon.png').resize(180, 180, { fit: 'contain', background: '#dadada' }).png().toFile('public/apple-touch-icon.png');
  console.log('done');
})();
