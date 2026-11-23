// SVG -> PNG a 2048x2048 (transparente cuando el SVG no tiene fondo)
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 2 });
  for (const f of fs.readdirSync(__dirname).filter((x) => x.endsWith('.svg'))) {
    await p.setContent(`<html><body style="margin:0;background:transparent">${fs.readFileSync(path.join(__dirname, f), 'utf8')}</body></html>`);
    await p.screenshot({ path: path.join(__dirname, f.replace('.svg', '.png')), omitBackground: true, clip: { x: 0, y: 0, width: 1024, height: 1024 } });
    console.log(f.replace('.svg', '.png'));
  }
  await b.close();
})();
