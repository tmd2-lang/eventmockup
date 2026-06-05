const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ defaultViewport: { width: 1280, height: 1000, deviceScaleFactor: 3 } });
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3000/export-slides');
  await page.goto('http://localhost:3000/export-slides', { waitUntil: 'networkidle0' });
  
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  for (let i = 1; i <= 9; i++) {
    console.log(`Capturing Slide ${i}...`);
    
    // Give Next.js images/fonts time to load and paint
    await new Promise(r => setTimeout(r, 2000));
    
    let element = await page.$('.device');
    if (!element) {
       const allDivs = await page.$$('div');
       for (let d of allDivs) {
         const box = await d.boundingBox();
         if (box && box.width === 375 && box.height === 812) {
            element = d;
            break;
         }
       }
    }

    if (element) {
      await element.screenshot({ path: `screenshots/Ligo-Slide-${i}.png`, omitBackground: true });
      console.log(`✅ Saved screenshots/Ligo-Slide-${i}.png`);
    } else {
      console.error(`❌ Could not find target on Slide ${i}`);
    }
    
    if (i < 9) {
      const clicked = await page.$$eval('button', btns => {
        const btn = btns.find(b => b.textContent && b.textContent.includes('Next Frame'));
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      });
      if (!clicked) {
        await page.keyboard.press('ArrowRight');
      }
    }
  }

  await browser.close();
  console.log('All done! Screenshots are in the "screenshots" folder.');
})();
