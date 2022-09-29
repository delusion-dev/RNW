const webdriverio = require('webdriverio');

const timeout = 10000;

const iosCaps = {
  platformName: 'iOS',
  deviceName: 'iPhone Simulator',
  platformVersion: "15.2",
  app: '/Users/dev/Library/Developer/Xcode/DerivedData/RNW-eihcsrwsdflkbacrceshsyktpigr/Build/Products/Debug-iphonesimulator/RNW.app',
  logLevel: 'error',
}

const androidCaps = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/debug/app-debug.apk',
  logLevel: 'error',
};

const options =  {
  capabilities: process.env.PLATFORM === 'android' ? androidCaps : iosCaps,
  path: '/wd/hub',
  host: process.env.APPIUM_HOST || 'localhost',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'error'
};

describe('Create Android session', function () {
  let client;

  beforeAll(async function () { 
    client = await webdriverio.remote(options);
  });

  it('should correctly navigate between pages', async () => {

    const link1 = await client.$('~HELLO-WORLD');
    expect(await link1.waitForExist({ timeout })).toBe(true);
    await link1.click();

    const page1 = await client.$('~HELLO-WORLD-PAGE');
    expect(await page1.waitForExist({ timeout })).toBe(true);

    const link2 = await client.$('~HOME');
    expect(await link2.waitForExist({ timeout })).toBe(true);
    await link2.click();

    const page2 = await client.$('~HOME-PAGE');
    expect(await page2.waitForExist({ timeout })).toBe(true);
  });

  afterAll(async () => {
    await client.deleteSession();
  });
});
