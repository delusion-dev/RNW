import wd from 'wd';

const androidConfig = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/debug/app-debug.apk'
};

const iosConfig = {
  platformName: 'iOS',
  deviceName: 'iPhone Simulator',
  platformVersion: "15.2",
  app: '/Users/dev/Library/Developer/Xcode/DerivedData/RNW-eihcsrwsdflkbacrceshsyktpigr/Build/Products/Debug-iphonesimulator/RNW.app'
};

const PORT = 4723;
const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
  await driver.init(process.env.PLATFORM === 'android' ? androidConfig: iosConfig);
  await driver.sleep(3000); // wait for app to load
})

it('should has navigation links', async () => {
  expect(await driver.hasElementByAccessibilityId('HOME')).toBe(true);
  expect(await driver.hasElementByAccessibilityId('HELLO-WORLD')).toBe(true);
});

it('should correctly navigate between pages', async () => {
  await driver.elementByAccessibilityId('HELLO-WORLD').click();
  await driver.sleep(100);
  expect(await driver.hasElementByAccessibilityId('HELLO-WORLD-PAGE')).toBe(true);

  await driver.elementByAccessibilityId('HOME').click();
  await driver.sleep(100);
  expect(await driver.hasElementByAccessibilityId('HOME-PAGE')).toBe(true);
});

afterAll(async () => {
  await driver.quit()
});
