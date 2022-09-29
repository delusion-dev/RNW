process.env.PLATFORM = 'ios';

const config = {
    //testMatch: [ "**/__e2e__/mobile.test.js" ],
    testMatch: [ "**/__e2e__/webdriverio.test.js" ],
    testTimeout: 30000,
};

module.exports = config;