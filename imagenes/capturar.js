// Convierte citora-1..6.html en PNG 1080x1350 (a doble resolución: 2160x2700).
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  const only = process.argv.slice(2);
  for (let i = 1; i <= 6; i++) {
    if (only.length && !only.includes(String(i))) continue;
    await p.goto('file://' + path.join(__dirname, `citora-${i}.html`));
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, `citora-${i}.png`) });
    console.log(`citora-${i}.png`);
  }
  await b.close();
})();
