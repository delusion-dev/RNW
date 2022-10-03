const localCaps = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/debug/app-debug.apk',
  logLevel: 'error',
};

const sauceCaps = {
  platformName: 'Android',
  deviceName: 'Android GoogleAPI Emulator',
  platformVersion: '12.0',
  automationName: 'UiAutomator2',
  app: 'storage:filename=app-release.apk',
  build: "build1",
  name: "test1"
}

// Rewrite configs for real device

if (process.env.REAL) {
  sauceCaps.deviceName = 'Samsung.*';
  delete sauceCaps.platformVersion;
}

module.exports = {
  localCaps,
  sauceCaps
}
