import expect from 'expect-puppeteer'
const { bootstrap } = require('./_bootstrap');

describe('extension tests', () => {
  let extPage, appPage, browser;

  beforeAll(async () => {
    const context = await bootstrap({ appUrl: 'https://google.com', slowMo: 100, devtools: true });

    extPage = context.extPage;
    appPage = context.appPage;
    browser = context.browser;
    
    await extPage.bringToFront();
  });

  it('should correctly navigate between pages', async () => {
    await expect(extPage).toClick('[aria-label="HELLO-WORLD"]');

    await expect(extPage).toMatch('Hello World Page');

    await expect(extPage).toClick('[aria-label="HOME"]')

    await expect(extPage).toMatch('Home Page');
  });

  afterAll(async () => {
    await browser.close();
    return true;
  });
});
