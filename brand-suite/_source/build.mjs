// Build every piece: node _source/build.mjs [filter]
// Each page in _source/pages/*.html declares its outputs in <meta name="out" content='[...]'>
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright')); }
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url)), root = path.join(here, '..');
const filter = process.argv[2] || '';
const browser = await chromium.launch();
for (const f of fs.readdirSync(path.join(here, 'pages')).filter(f => f.endsWith('.html') && f.includes(filter)).sort()) {
  const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1400, height: 1000 } });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(here, 'pages', f));
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(250);
  const outs = JSON.parse(await page.locator('meta[name=out]').getAttribute('content'));
  for (const o of outs) {
    const file = path.join(root, o.file); fs.mkdirSync(path.dirname(file), { recursive: true });
    if (o.type === 'pdf') { await page.pdf({ path: file, preferCSSPageSize: true, printBackground: true }); }
    else { // png of one element (optionally scaled)
      const c2 = await browser.newContext({ deviceScaleFactor: o.scale || 2, viewport: { width: o.vw || 1400, height: 1000 } });
      const p2 = await c2.newPage(); await p2.goto('file://' + path.join(here, 'pages', f));
      await p2.evaluate(() => document.fonts.ready); await p2.waitForTimeout(250);
      const el = p2.locator(o.sel).nth(o.nth || 0);
      await el.screenshot({ path: file, type: file.endsWith('.jpg') ? 'jpeg' : 'png', quality: file.endsWith('.jpg') ? 88 : undefined });
      await c2.close();
    }
    console.log('  ✓', o.file);
  }
  await ctx.close();
}
await browser.close();
