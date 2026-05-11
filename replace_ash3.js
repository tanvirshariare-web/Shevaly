const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'app');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace text-white with text-black everywhere
  content = content.replace(/text-white/g, 'text-black');
  
  // Update fill-white to fill-black
  content = content.replace(/fill-white/g, 'fill-black');
  
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
