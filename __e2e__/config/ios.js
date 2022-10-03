const localCaps = {
  platformName: 'iOS',
  deviceName: 'iPhone Simulator',
  platformVersion: "15.5",
  app: '/Users/dev/Library/Developer/Xcode/DerivedData/RNW-eihcsrwsdflkbacrceshsyktpigr/Build/Products/Debug-iphonesimulator/RNW.app',
  logLevel: 'error',
}

const sauceCaps = {
  platformName: 'iOS',
  deviceName: 'iPhone Simulator',
  platformVersion: '15',
  automationName: 'XCUITest',
  app: 'storage:filename=RNW.ipa',
  build: "build2",
  name: "test2"
}

// Rewrite configs for real device

if (process.env.REAL) {
  sauceCaps.deviceName = 'iPhone.*';
  delete sauceCaps.platformVersion;
}

module.exports = {
  localCaps,
  sauceCaps
}
