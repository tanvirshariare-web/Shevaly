const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'app');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // The primary pink hex color
  content = content.replace(/bg-\[#52525b\] text-white/g, 'bg-[#52525b] text-black'); 
  content = content.replace(/text-white bg-\[#52525b\]/g, 'text-black bg-[#52525b]');
  content = content.replace(/bg-\[#52525b\] text-\[11px\]/g, 'bg-[#52525b] text-black text-[11px]');
  content = content.replace(/text-white drop-shadow-lg/g, 'text-black drop-shadow-lg');
  content = content.replace(/text-white transition-all/g, 'text-black transition-all');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(currentDirPath) {
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.js'))) {
      replaceInFile(filePath);
    } else if (stat.isDirectory()) {
      walkDir(filePath);
    }
  });
}

walkDir(directoryPath);
