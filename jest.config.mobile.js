const config = {
    testEnvironment: './jest.environment.mobile.js',
    testMatch: [ "**/__e2e__/webdriverio.test.js" ],
    testTimeout: 3*60*1000,
};

module.exports = config;