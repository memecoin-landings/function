#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const OUT_DIR = './out';

// File extensions that should be compressed
const COMPRESSIBLE_EXTENSIONS = [
  '.html', '.css', '.js', '.json', '.xml', '.svg', '.txt', '.md'
];

// Files to skip compression
const SKIP_FILES = [
  'robots.txt', 'sitemap.xml'
];

function shouldCompress(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  if (SKIP_FILES.includes(fileName)) {
    return false;
  }
  
  return COMPRESSIBLE_EXTENSIONS.includes(ext);
}

function compressFile(filePath, algorithm, extension) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(`${filePath}${extension}`);
    
    let compressor;
    if (algorithm === 'gzip') {
      compressor = zlib.createGzip({ level: 9 });
    } else if (algorithm === 'brotli') {
      compressor = zlib.createBrotliCompress({
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          [zlib.constants.BROTLI_PARAM_SIZE_HINT]: fs.statSync(filePath).size,
        }
      });
    }
    
    readStream
      .pipe(compressor)
      .pipe(writeStream)
      .on('finish', () => {
        const originalSize = fs.statSync(filePath).size;
        const compressedSize = fs.statSync(`${filePath}${extension}`).size;
        const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
        console.log(`✓ ${path.relative(OUT_DIR, filePath)} → ${extension} (${ratio}% smaller)`);
        resolve();
      })
      .on('error', reject);
  });
}

async function compressDirectory(dir) {
  const items = fs.readdirSync(dir);
  const compressionPromises = [];
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      await compressDirectory(itemPath);
    } else if (stat.isFile() && shouldCompress(itemPath)) {
      // Skip already compressed files
      if (item.endsWith('.gz') || item.endsWith('.br')) {
        continue;
      }
      
      // Compress with both gzip and brotli
      compressionPromises.push(
        compressFile(itemPath, 'gzip', '.gz'),
        compressFile(itemPath, 'brotli', '.br')
      );
    }
  }
  
  await Promise.all(compressionPromises);
}

async function main() {
  console.log('🗜️  Compressing static files...');
  
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`❌ Output directory ${OUT_DIR} does not exist. Run 'npm run build' first.`);
    process.exit(1);
  }
  
  try {
    await compressDirectory(OUT_DIR);
    console.log('✅ All files compressed successfully!');
    
    // Summary statistics
    const allFiles = [];
    function collectFiles(dir) {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
          collectFiles(itemPath);
        } else {
          allFiles.push(itemPath);
        }
      }
    }
    
    collectFiles(OUT_DIR);
    const originalFiles = allFiles.filter(f => !f.endsWith('.gz') && !f.endsWith('.br'));
    const gzipFiles = allFiles.filter(f => f.endsWith('.gz'));
    const brotliFiles = allFiles.filter(f => f.endsWith('.br'));
    
    console.log(`\n📊 Summary:`);
    console.log(`   Original files: ${originalFiles.length}`);
    console.log(`   Gzip files: ${gzipFiles.length}`);
    console.log(`   Brotli files: ${brotliFiles.length}`);
    
  } catch (error) {
    console.error('❌ Compression failed:', error);
    process.exit(1);
  }
}

main();