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

let SAUCE_USERNAME = 'oauth-developer1.apriorit-794aa';
let SAUCE_ACCESS_KEY = '37263e42-8411-470d-ac0f-484884224c39';

const sauceOptions =  {
  capabilities: {
    platformName: 'Android',
    deviceName: 'Android GoogleAPI Emulator',
    platformVersion: '12.0',
    automationName: 'UiAutomator2',
    app: 'storage:filename=app-release.apk',
    build: "build1",
    name: "test1"
  },
  protocol: "https",
  path: '/wd/hub',
  hostname: `${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com`,
  port: 443,
  region: 'eu',
};

describe('Create Android session', function () {
  let client;

  beforeAll(async function () { 
    client = await webdriverio.remote(process.env.SAUCE === 'true' ? sauceOptions : options);
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
    await client.execute('sauce:job-result=passed')
    await client.deleteSession();
  });
});
