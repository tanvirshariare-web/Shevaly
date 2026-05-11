const fs = require('fs');
const filePath = 'app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/orange-600/g, 'zinc-800');
content = content.replace(/orange-500/g, 'zinc-700');
content = content.replace(/from-orange-400/g, 'from-zinc-500');

content = content.replace(/bg-\[#d4d4d8\]/g, 'bg-zinc-800');
content = content.replace(/bg-\[#d4d4d8\]\/50/g, 'bg-zinc-800/50');
content = content.replace(/bg-zinc-800 text-black/g, 'bg-zinc-800 text-white');

content = content.replace(/hover:bg-\[#d4d4d8\]/g, 'hover:bg-zinc-600');
content = content.replace(/border-\[#d4d4d8\]/g, 'border-zinc-700');
content = content.replace(/focus:ring-\[#d4d4d8\]/g, 'focus:ring-zinc-700');
content = content.replace(/focus:border-\[#d4d4d8\]/g, 'focus:border-zinc-700');
content = content.replace(/text-\[#d4d4d8\]/g, 'text-zinc-700');
content = content.replace(/hover:text-\[#d4d4d8\]/g, 'hover:text-zinc-700');
content = content.replace(/group-hover:text-\[#d4d4d8\]/g, 'group-hover:text-zinc-700');
content = content.replace(/fill-\[#d4d4d8\]/g, 'fill-zinc-600');
content = content.replace(/from-\[#d4d4d8\]/g, 'from-zinc-700');
content = content.replace(/via-zinc-500 to-orange-400/g, 'via-zinc-500 to-zinc-400');

fs.writeFileSync(filePath, content);
console.log('Theme updated to dark ash.');
