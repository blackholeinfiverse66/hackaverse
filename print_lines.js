const fs = require('fs');
const p = 'c:/Users/yashl/Downloads/BHIV/Hackaverse/hackaverse-frontend/src/components/ui/SearchOverlay.jsx';
const s = fs.readFileSync(p,'utf8').split('\n');
for (let i=70;i<=90;i++) console.log((i+1)+': '+(s[i]||''));
