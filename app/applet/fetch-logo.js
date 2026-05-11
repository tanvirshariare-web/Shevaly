const https = require('https');

https.get('https://postimg.cc/gw8fH5p9', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Regex to find property="og:image" content="..."
    const match = data.match(/property="og:image"\s+content="([^"]+)"/i);
    if (match) {
      console.log("LOGO_URL:", match[1]);
    } else {
      console.log("Not found in og:image");
      // Try finding raw i.postimg.cc
      const iMatch = data.match(/https:\/\/i\.postimg\.cc\/[^"]+/i);
      console.log("Alt match:", iMatch ? iMatch[0] : "None");
    }
  });
});
