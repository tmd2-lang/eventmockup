const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ defaultViewport: { width: 1280, height: 1000, deviceScaleFactor: 3 } });
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3000/export-gracestreet');
  await page.goto('http://localhost:3000/export-gracestreet', { waitUntil: 'networkidle0' });
  
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  console.log(`Waiting for animations to finish...`);
  // Wait longer so the animation slideUpFade can finish!
  await new Promise(r => setTimeout(r, 2000));
  
  const element = await page.$('.device'); // IOSDevice has className="device" 
  if (!element) {
     const allDivs = await page.$$('div');
     for (let d of allDivs) {
       const box = await d.boundingBox();
       if (box && box.width === 375 && box.height === 812) {
          await d.screenshot({ path: `screenshots/Ligo-Grace-Street.png`, omitBackground: true });
          console.log(`✅ Saved screenshots/Ligo-Grace-Street.png by bounding box`);
          await browser.close();
          return;
       }
     }
  } else {
    await element.screenshot({ path: `screenshots/Ligo-Grace-Street.png`, omitBackground: true });
    console.log(`✅ Saved screenshots/Ligo-Grace-Street.png by selector`);
  }

  await browser.close();
  console.log('All done!');
})();
