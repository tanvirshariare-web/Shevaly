const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');
const lines = code.split('\n');
lines.forEach((l, i) => { if(l.includes('<button') && (l.includes('bg-') || lines[i+1]?.includes('bg-'))) console.log((i+1) + ': ' + l.trim()); });
