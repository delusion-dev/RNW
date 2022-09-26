const puppeteer = require('puppeteer');
const path = require('path');

const extPath = path.resolve(__dirname, '../dist');

async function bootstrap(options = {}) {
  const { devtools = false, slowMo = false, appUrl } = options;
  const browser = await puppeteer.launch({
    headless: true,
    devtools,
    args: [
      '--no-sandbox',
      `--disable-extensions-except=${extPath}`,
      `--load-extension=${extPath}`,
    ],
    executablePath: path.resolve(__dirname, "../node_modules/puppeteer/.local-chromium/linux-1002410/chrome-linux/chrome"),
    ...(slowMo && { slowMo }),
  });

  const appPage = await browser.newPage();
  await appPage.goto(appUrl, { waitUntil: 'load' });

  const targets = await browser.targets();
  const extensionTarget = targets.find(target => target.type() === 'service_worker');
  const partialExtensionUrl = extensionTarget.url() || '';
  const [, , extensionId] = partialExtensionUrl.split('/');

  const extPage = await browser.newPage();
  const extensionUrl = `chrome-extension://${extensionId}/index.html`;
  await extPage.goto(extensionUrl, { waitUntil: 'load' });

  return {
    appPage,
    browser,
    extensionUrl,
    extPage,
  };
}

module.exports = { bootstrap };
