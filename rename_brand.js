const fs = require('fs');
['app/page.tsx', 'app/TermsModal.tsx', 'app/AuthModal.tsx', 'app/UserProfileModal.tsx'].forEach(f => {
  if (fs.existsSync(f)) {
    let code = fs.readFileSync(f, 'utf-8');
    if (code.includes('Hevaly')) {
      code = code.replace(/Hevaly/g, 'Shevaly');
      code = code.replace(/hevaly/g, 'shevaly');
      fs.writeFileSync(f, code);
      console.log(`Replaced Hevaly in ${f}`);
    }
  }
});
