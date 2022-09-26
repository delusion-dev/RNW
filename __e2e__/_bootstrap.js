const puppeteer = require('puppeteer');
const path = require('path');

const extPath = path.resolve(__dirname, '../dist');

async function bootstrap(options = {}) {
  const { devtools = false, slowMo = false, appUrl } = options;
  const browser = await puppeteer.launch({
    headless: false,
    devtools,
    args: [
      '--no-sandbox',
      `--disable-extensions-except=${extPath}`,
      `--load-extension=${extPath}`,
    ],
    executablePath: process.env.PUPPETEER_EXEC_PATH,
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
