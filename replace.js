const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
code = code.replace(/href="#"/g, 'href="/"');
fs.writeFileSync('app/page.tsx', code);
