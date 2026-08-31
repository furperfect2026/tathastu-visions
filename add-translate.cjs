const fs = require('fs');
let c = fs.readFileSync('src/routes/__root.tsx', 'utf8');
c = c.replace('</head>', `
        <style dangerouslySetInnerHTML={{ __html: \`
          body { top: 0 !important; }
          .skiptranslate > iframe.skiptranslate { display: none !important; visibility: hidden !important; }
          #google_translate_element { display: none !important; }
          .goog-te-banner-frame { display: none !important; }
        \` }} />
        <script dangerouslySetInnerHTML={{ __html: \`function googleTranslateElementInit() { new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,hi,mr', autoDisplay: false}, 'google_translate_element'); }\` }} />
        <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
      </head>`);
c = c.replace('<body>', '<body>\n        <div id="google_translate_element"></div>');
fs.writeFileSync('src/routes/__root.tsx', c);
console.log('Added Translate scripts to root.tsx');
