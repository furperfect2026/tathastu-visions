const fs = require('fs');
let code = fs.readFileSync('src/components/LanguageSelector.tsx', 'utf8');

const newChangeLanguage = `  const changeLanguage = (langCode: string) => {
    const host = window.location.hostname;
    const parts = host.split('.');
    
    // Generate possible domain variations to ensure we clear/set the cookie everywhere
    const domains = ['', host, '.' + host];
    if (parts.length > 2) {
      parts.shift();
      const baseDomain = parts.join('.');
      domains.push(baseDomain);
      domains.push('.' + baseDomain);
    }

    domains.forEach((d) => {
      const domainStr = d ? \`; domain=\${d}\` : '';
      if (langCode === "en") {
        // Clear all variations of the cookie
        document.cookie = \`googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/\${domainStr}\`;
        document.cookie = \`googtrans=/en/en; path=/\${domainStr}\`;
      } else {
        document.cookie = \`googtrans=/en/\${langCode}; path=/\${domainStr}\`;
      }
    });

    // Reload to apply changes
    window.location.reload();
  };`;

code = code.replace(/const changeLanguage = \(langCode: string\) => \{[\s\S]*?window\.location\.reload\(\);\s*\};/, newChangeLanguage);

fs.writeFileSync('src/components/LanguageSelector.tsx', code);
console.log('Fixed changeLanguage');
