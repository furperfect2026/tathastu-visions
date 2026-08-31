const fs = require('fs');
let c = fs.readFileSync('src/components/SiteNav.tsx', 'utf8');

c = c.replace(
  'import { Logo } from "./Logo";',
  'import { Logo } from "./Logo";\nimport { LanguageSelector } from "./LanguageSelector";'
);

c = c.replace(
  `        <div className="hidden lg:block">
          <Button
            asChild
            className="rounded-full bg-gradient-gold px-6 text-ink shadow-gold hover:opacity-90"
          >
            <Link to="/" hash="contact">
              Get In Touch →
            </Link>
          </Button>
        </div>
        <button`,
  `        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSelector />
          <Button
            asChild
            className="rounded-full bg-gradient-gold px-6 text-ink shadow-gold hover:opacity-90"
          >
            <Link to="/" hash="contact">
              Get In Touch →
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSelector />
          <button`
);

c = c.replace(
  '          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}\n        </button>\n      </div>',
  '          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}\n        </button>\n        </div>\n      </div>'
);

// We need to change the <LanguageSelector> sm:flex to flex inside the component!
fs.writeFileSync('src/components/SiteNav.tsx', c);

let l = fs.readFileSync('src/components/LanguageSelector.tsx', 'utf8');
l = l.replace('hidden items-center', 'flex items-center');
l = l.replace('sm:flex', '');
fs.writeFileSync('src/components/LanguageSelector.tsx', l);

console.log('Added LanguageSelector to SiteNav');
