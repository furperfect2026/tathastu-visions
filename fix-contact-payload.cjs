const fs = require('fs');
let code = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');

code = code.replace(
  '        email: form.get("email"),\n        interest,\n        message: form.get("message"),',
  '        email: form.get("email"),\n        interest,\n        city,\n        message: form.get("message"),'
);

fs.writeFileSync('src/components/ContactSection.tsx', code);
console.log('Fixed ContactSection payload');
