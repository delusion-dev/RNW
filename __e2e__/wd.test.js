import wd from 'wd';

const timeout = 10000;

const {
  isDisplayed,
} = wd.asserters;

let SAUCE_USERNAME = 'oauth-developer1.apriorit-794aa';
let SAUCE_ACCESS_KEY = '37263e42-8411-470d-ac0f-484884224c39';

const serverConfig = {
  protocol: "https",
  host: `${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com`,
  port: 443,
  region: 'eu',
};

const sauceAndroidCapabilities = {
  platformName: 'Android',
  deviceName: 'Android GoogleAPI Emulator',
  platformVersion: '12.0',
  automationName: 'UiAutomator2',
  app: 'storage:filename=app-release.apk',
  build: "build1",
  name: "test1"
};

const androidCapabilities = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/debug/app-debug.apk'
};

const iosCapabilities = {
  platformName: 'iOS',
  deviceName: 'iPhone Simulator',
  platformVersion: "15.2",
  app: '/Users/dev/Library/Developer/Xcode/DerivedData/RNW-eihcsrwsdflkbacrceshsyktpigr/Build/Products/Debug-iphonesimulator/RNW.app'
};

let capabilities = iosCapabilities;
if (process.env.SAUCE === 'true') {
  capabilities = sauceAndroidCapabilities;
} else if (process.env.PLATFORM === 'android') {
  capabilities = androidCapabilities;
}

const PORT = 4723;

let driver

beforeAll(async () => {
    driver = await wd.promiseChainRemote(process.env.SAUCE === 'true' ? serverConfig : 'localhost', PORT);
    await driver.init(capabilities);
    await driver.sleep(3000); // wait for app to load (local test fails without it)
})

it('should has navigation links', async () => {
  expect(await driver.hasElementByAccessibilityId('HOME')).toBe(true);
  expect(await driver.hasElementByAccessibilityId('HELLO-WORLD')).toBe(true);
});

it('should correctly navigate between pages', async () => {
  await driver.elementByAccessibilityId('HELLO-WORLD').click();
  expect(await driver.waitForElementByAccessibilityId('HELLO-WORLD-PAGE', isDisplayed, timeout)).toBeTruthy();

  await driver.elementByAccessibilityId('HOME').click();
  expect(await driver.waitForElementByAccessibilityId('HOME-PAGE', isDisplayed, timeout)).toBeTruthy();
});

afterAll(async () => {
  // await driver.execute('sauce:job-result=passed')
  await driver.quit()
});
