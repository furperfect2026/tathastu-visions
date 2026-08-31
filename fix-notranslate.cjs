const fs = require('fs');
let l = fs.readFileSync('src/components/LanguageSelector.tsx', 'utf8');
l = l.replace('<DropdownMenu>', '<div className="notranslate">\n    <DropdownMenu>');
l = l.replace('</DropdownMenu>', '</DropdownMenu>\n    </div>');
fs.writeFileSync('src/components/LanguageSelector.tsx', l);
console.log('Added notranslate class to LanguageSelector');
