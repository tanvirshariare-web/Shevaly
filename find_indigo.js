const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');
const lines = code.split('\n');
lines.forEach((l, i) => { if(l.includes('bg-indigo-600') || l.includes('bg-indigo-500') || l.includes('bg-[#0f172a]')) console.log((i+1) + ': ' + l.trim()); });
