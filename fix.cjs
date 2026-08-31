const fs = require('fs');
let c = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');
c = c.replace(/interest,\r?\n\s*message:/, 'interest,\n        city,\n        message:');
fs.writeFileSync('src/components/ContactSection.tsx', c);
console.log('Fixed ContactSection payload with regex');
