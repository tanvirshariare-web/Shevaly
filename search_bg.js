const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');
const lines = code.split('\n');
lines.forEach((l, i) => { if(l.includes('bg-black')) console.log(i + ': ' + l.trim()); });
