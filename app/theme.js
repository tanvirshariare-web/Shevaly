const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// The user wants an Ash theme. Ash is typically a slate or zinc gray.
// The original "ash" used was #d4d4d8 (which is very light, zinc-300).
// Let's use a sophisticated Ash palette:
// Primary Backgrounds/Buttons: bg-zinc-700 (#3f3f46) -> eye catching white text
// Primary Accents (formerly orange-600 / #d4d4d8): text-zinc-700
// Text inside light ash backgrounds: text-zinc-900 (bold dark)

// 1. Revert all the orange changes to a solid Dark Ash (zinc-700) for high contrast and readability.
content = content.replace(/orange-600/g, 'zinc-700');
content = content.replace(/orange-500/g, 'zinc-600');
content = content.replace(/from-orange-400/g, 'from-zinc-500');

// 2. The primary background color was bg-[#d4d4d8]. Let's make it a bold dark ash `bg-zinc-800` so the theme is truly "Ash" and text pops.
content = content.replace(/bg-\[#d4d4d8\]/g, 'bg-zinc-800');
content = content.replace(/bg-\[#d4d4d8\]\/50/g, 'bg-zinc-800/50');

// 3. Any text that was black inside these backgrounds might need to be white now for eye-catching contrast.
// Wait, the header is `bg-zinc-800 text-black`. That's unreadable. Let's fix that.
content = content.replace(/bg-zinc-800 text-black/g, 'bg-zinc-800 text-white');

// 4. Update the hover states for background
content = content.replace(/hover:bg-\[#d4d4d8\]/g, 'hover:bg-zinc-600');

// 5. Update borders
content = content.replace(/border-\[#d4d4d8\]/g, 'border-zinc-700');

// 6. Fix specific focus rings
content = content.replace(/focus:ring-\[#d4d4d8\]/g, 'focus:ring-zinc-700');
content = content.replace(/focus:border-\[#d4d4d8\]/g, 'focus:border-zinc-700');

// 7. Make sure from-[#d4d4d8] goes to zinc
content = content.replace(/from-\[#d4d4d8\]/g, 'from-zinc-700');

fs.writeFileSync('app/page.tsx', content);
console.log('Theme updated to dark ash.');
