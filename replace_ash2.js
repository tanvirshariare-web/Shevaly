const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'app');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Find classNames that have bg-[#52525b] and text-white, and change text-white to text-black
  content = content.replace(/(className="[^"]*bg-\[#52525b\][^"]*)text-white([^"]*")/g, '$1text-black$2');
  
  // also text-white might be before bg-[#52525b]
  content = content.replace(/(className="[^"]*text-white[^"]*)bg-\[#52525b\]([^"]*")/g, function(match, p1, p2) {
      if (match.includes('bg-[#52525b]')) {
          return match.replace('text-white', 'text-black');
      }
      return match;
  });

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
