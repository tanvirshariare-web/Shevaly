const fs = require('fs');

const fileNames = ['app/page.tsx', 'app/TermsModal.tsx', 'app/AuthModal.tsx', 'app/UserProfileModal.tsx', 'app/LiveChat.tsx'];

fileNames.forEach(f => {
  if (fs.existsSync(f)) {
    let code = fs.readFileSync(f, 'utf-8');
    
    // Replace theme colors
    code = code.replace(/#DC143C/gi, '#80091B');
    code = code.replace(/#901235/gi, '#80091B');
    code = code.replace(/#B22222/gi, '#80091B');
    code = code.replace(/#990000/gi, '#80091B');
    
    // Replace light ash button backgrounds with maroon
    code = code.replace(/bg-\[#ebeced\]/g, 'bg-[#80091B]');
    // When changing to dark maroon, text needs to be white
    code = code.replace(/bg-\[#80091B\] text-gray-900/g, 'bg-[#80091B] text-white');
    
    // Replace hover ash
    code = code.replace(/hover:bg-\[#e6e8ea\]/g, 'hover:bg-[#5A0613]');
    
    // Replace very light ash (used for borders or secondary cards) with soft pink/maroon tint
    code = code.replace(/#eeeef2/g, 'FDE2E4');
    
    // Convert 'text-[#0a1e42]' (dark blue/navy text) to a dark maroon
    code = code.replace(/text-\[#0a1e42\]/g, 'text-[#4A000A]');
    
    fs.writeFileSync(f, code);
  }
});
console.log('Colors replaced.');
