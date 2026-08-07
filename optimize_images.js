import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'src', 'assets');

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  let totalSaved = 0;

  for (const file of files) {
    if (!file.match(/\.(png|jpe?g)$/i)) continue;
    
    const filePath = path.join(assetsDir, file);
    const tempPath = path.join(assetsDir, 'temp_' + file);
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      if (file.includes('chatbot-ronal')) {
        await image
          .resize(256, 256, { fit: 'cover' })
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(tempPath);
      } else if (file.match(/\.(jpe?g)$/i)) {
        await image
          .resize({ width: Math.min(metadata.width || 1280, 1280) })
          .jpeg({ quality: 75, progressive: true })
          .toFile(tempPath);
      } else if (file.match(/\.(png)$/i)) {
        await image
          .resize({ width: Math.min(metadata.width || 1280, 1280) })
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(tempPath);
      }

      const newStats = fs.statSync(tempPath);
      
      if (newStats.size < originalSize) {
        fs.renameSync(tempPath, filePath);
        const saved = (originalSize - newStats.size) / 1024;
        totalSaved += saved;
        console.log(`Optimized ${file}: Saved ${saved.toFixed(2)} KB`);
      } else {
        fs.unlinkSync(tempPath); // Discard if larger
        console.log(`Skipped ${file}: Already optimal`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log(`\nTotal space saved: ${(totalSaved / 1024).toFixed(2)} MB`);
}

optimizeImages();
