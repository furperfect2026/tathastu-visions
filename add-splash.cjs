const fs = require('fs');
let c = fs.readFileSync('src/routes/__root.tsx', 'utf8');

c = c.replace(
  'import { SmoothScroll } from "@/components/SmoothScroll";',
  'import { SmoothScroll } from "@/components/SmoothScroll";\nimport { SplashScreen } from "@/components/SplashScreen";'
);

c = c.replace(
  '<QueryClientProvider client={queryClient}>',
  '<QueryClientProvider client={queryClient}>\n      <SplashScreen />'
);

fs.writeFileSync('src/routes/__root.tsx', c);
console.log('Added SplashScreen to __root.tsx');
