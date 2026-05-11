const fs = require('fs');
const filePath = 'app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Theme Colors
const MERCURY = '#ebeced';
const WHITE_SMOKE = '#f6f5f5';
const PAPER_WHITE = '#eeeef2';
const PLACEBO = '#e6e8ea';

// 1. Root Background
content = content.replace(/bg-\[#fdf4f7\]/g, `bg-[${WHITE_SMOKE}]`);

// 2. Header and primary dark zones
content = content.replace(/bg-zinc-800 text-white/g, `bg-[${MERCURY}] text-gray-900 shadow-sm`);
content = content.replace(/text-white/g, 'text-gray-900'); // Clean up any lingering white text on what are now light buttons

// 3. Primary Elements (Buttons, Badge Bgs, etc.) converted from zinc-800
// Since these need interaction contrast, we'll use Placebo (e6e8ea) with a subtle border.
content = content.replace(/bg-zinc-800/g, `bg-[${PLACEBO}] shadow-sm`);
content = content.replace(/hover:bg-zinc-600/g, `hover:bg-[${MERCURY}] hover:shadow`);

// 4. Secondary Backgrounds
content = content.replace(/bg-zinc-50/g, `bg-[${PAPER_WHITE}]`);
content = content.replace(/bg-gray-50/g, `bg-[${PAPER_WHITE}]`);
content = content.replace(/bg-zinc-100/g, `bg-[${MERCURY}]`);

// 5. Borders
content = content.replace(/border-zinc-700/g, `border-gray-200`); // Previously used for accent borders. A light gray ensures they are visible.
content = content.replace(/border-zinc-200/g, `border-[${MERCURY}]`);
content = content.replace(/border-zinc-100/g, `border-[${PAPER_WHITE}]`);
content = content.replace(/border-gray-200/g, `border-[${MERCURY}]`);

// 6. Text Colors & Accents
// We used zinc-800/zinc-700 heavily for accents. Change back to gray-800/700
content = content.replace(/text-zinc-800/g, 'text-gray-800');
content = content.replace(/text-zinc-700/g, 'text-gray-700');
content = content.replace(/hover:text-zinc-700/g, 'hover:text-gray-900');
content = content.replace(/group-hover:text-zinc-700/g, 'group-hover:text-gray-900');
content = content.replace(/fill-zinc-600/g, 'fill-gray-600');
content = content.replace(/from-zinc-500/g, 'from-gray-300');
content = content.replace(/via-zinc-500/g, 'via-gray-400');
content = content.replace(/to-zinc-400/g, 'to-gray-500');
content = content.replace(/from-zinc-700/g, 'from-gray-400');
content = content.replace(/to-zinc-300/g, 'to-gray-200');

// 7. Focus rings
content = content.replace(/focus:ring-zinc-700/g, `focus:ring-[${PLACEBO}]`);
content = content.replace(/focus:border-zinc-700/g, `focus:border-[${MERCURY}]`);

fs.writeFileSync(filePath, content);
console.log('Applet theme applied applying new color code names.');
