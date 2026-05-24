const Jimp = require('jimp');

async function resizeIcons() {
  try {
    const image = await Jimp.read('./public/logo.jpg');
    
    // Create 192x192
    await image.clone().cover(192, 192).writeAsync('./public/pwa-192x192.png');
    console.log('Created pwa-192x192.png');
    
    // Create 512x512
    await image.clone().cover(512, 512).writeAsync('./public/pwa-512x512.png');
    console.log('Created pwa-512x512.png');
    
  } catch (err) {
    console.error('Error resizing images:', err);
  }
}

resizeIcons();
