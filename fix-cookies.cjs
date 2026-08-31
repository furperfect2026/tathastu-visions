const fs = require('fs');
let code = fs.readFileSync('src/components/LanguageSelector.tsx', 'utf8');

code = code.replace(
  '    if (langCode === "en") {\n      // Clear the cookie to revert to original\n      document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname;\n      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";\n    } else {\n      // Set the translation cookie\n      document.cookie = `googtrans=/en/${langCode}; path=/`;\n      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;\n    }',
  `    if (langCode === "en") {
      // Clear the cookie for all possible variations
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
      document.cookie = "googtrans=/en/en; path=/;";
      document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname;
    } else {
      // Set the translation cookie
      document.cookie = \\\`googtrans=/en/\\\${langCode}; path=/\\\`;
      document.cookie = \\\`googtrans=/en/\\\${langCode}; path=/; domain=\\\${window.location.hostname}\\\`;
    }`
);

fs.writeFileSync('src/components/LanguageSelector.tsx', code);
console.log('Fixed changeLanguage');
