// guia/guia-01..15.html -> PNG (2160x2700) + un solo PDF para mandar por WhatsApp
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
(async () => {
  const dir = path.join(__dirname, 'guia');
  const files = fs.readdirSync(dir).filter((f) => /^guia-\d+\.html$/.test(f)).sort();
  const only = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  for (const f of files) {
    const n = String(parseInt(f.match(/\d+/)[0], 10));
    if (only.length && !only.includes(n)) continue;
    await p.goto('file://' + path.join(dir, f));
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(dir, f.replace('.html', '.png')) });
    console.log(f.replace('.html', '.png'));
  }
  if (!only.length) {
    // PDF: una página por imagen
    const imgs = files.map((f) => `<img src="${f.replace('.html', '.png')}" style="width:1080px;height:1350px;display:block;page-break-after:always">`).join('');
    const tmp = path.join(dir, '_pdf.html');
    fs.writeFileSync(tmp, `<html><body style="margin:0">${imgs}</body></html>`);
    const pdfPage = await b.newPage();
    await pdfPage.goto('file://' + tmp, { waitUntil: 'load' });
    await pdfPage.pdf({ path: path.join(dir, 'Guia-Citora.pdf'), width: '1080px', height: '1350px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    fs.unlinkSync(tmp);
    console.log('Guia-Citora.pdf');
  }
  await b.close();
})();
