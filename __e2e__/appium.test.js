
import wd from 'wd';

const PORT = 4723;
const config = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/debug/app-debug.apk'
};

jest.setTimeout(60000);
const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(10000); // wait for app to load
})

it('should has navigation links', async () => {
  expect(await driver.hasElementByAccessibilityId('HOME')).toBe(true);
  expect(await driver.hasElementByAccessibilityId('HELLO-WORLD')).toBe(true);
});

it('should correctly navigate between pages', async () => {
  await driver.elementByAccessibilityId('HELLO-WORLD').click();
  await driver.sleep(2000);
  expect(await driver.hasElementByAccessibilityId('HELLO-WORLD-PAGE')).toBe(true);

  await driver.elementByAccessibilityId('HOME').click();
  await driver.sleep(2000);
  expect(await driver.hasElementByAccessibilityId('HOME-PAGE')).toBe(true);
});

afterAll(async () => {
  await driver.quit()
});
