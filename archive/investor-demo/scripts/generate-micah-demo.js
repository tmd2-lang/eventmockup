const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ defaultViewport: { width: 1440, height: 1200, deviceScaleFactor: 2 } });
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3000/investor-demo');
  await page.goto('http://localhost:3000/investor-demo', { waitUntil: 'networkidle0' });
  
  const base64Images = [];

  for (let i = 1; i <= 6; i++) {
    console.log(`Capturing Scene ${i}...`);
    
    // Give Next.js animations/images time to settle
    await new Promise(r => setTimeout(r, 2000));
    
    // Screenshot the entire viewport as base64
    const base64 = await page.screenshot({ encoding: 'base64', fullPage: true });
    base64Images.push(`data:image/png;base64,${base64}`);
    
    if (i < 6) {
      // Advance to the next scene
      await page.keyboard.press('ArrowRight');
    }
  }

  await browser.close();
  
  console.log('Generating HTML file...');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ligo - Investor Demo</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            min-height: 100%;
            background-color: #0A0907;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        #presentation-container {
            width: 100%;
            min-height: 100vh;
            cursor: pointer;
            padding: 40px 0;
            box-sizing: border-box;
            text-align: center;
        }
        img {
            max-width: 95%;
            height: auto;
            display: inline-block;
            vertical-align: middle;
            user-select: none;
            -webkit-user-drag: none;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .controls-hint {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.4);
            font-size: 13px;
            pointer-events: none;
            transition: opacity 0.5s ease;
        }
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: #F97316;
            transition: width 0.3s ease;
            z-index: 10;
        }
    </style>
</head>
<body>
    <div class="progress-bar" id="progress"></div>
    <div id="presentation-container" onclick="nextSlide()">
        <img id="slide-img" src="${base64Images[0]}" alt="Slide 1" />
    </div>
    <div class="controls-hint" id="hint">Click anywhere or use Arrow Keys to advance</div>

    <script>
        const slides = ${JSON.stringify(base64Images)};
        let currentSlide = 0;
        const imgElement = document.getElementById('slide-img');
        const progressElement = document.getElementById('progress');
        const hintElement = document.getElementById('hint');

        function updateSlide() {
            imgElement.src = slides[currentSlide];
            progressElement.style.width = ((currentSlide + 1) / slides.length) * 100 + '%';
        }

        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateSlide();
                hintElement.style.opacity = '0'; // Hide hint after first click
            }
        }

        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlide();
            }
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                prevSlide();
            }
        });

        // Initialize progress bar
        updateSlide();
    </script>
</body>
</html>
  `;

  fs.writeFileSync('micah-investor-demo.html', htmlContent.trim());
  console.log('✅ Success! Saved to micah-investor-demo.html');
})();
