const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');
code = code.replace(/rgba\(230,28,93,/g, 'rgba(220,20,60,');
fs.writeFileSync('app/page.tsx', code);
