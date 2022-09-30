process.env.PLATFORM = 'android';
//process.env.SAUCE = 'true';

const config = {
    testMatch: [ "**/__e2e__/wd.test.js" ],
    //testMatch: [ "**/__e2e__/webdriverio.test.js" ],
    testTimeout: 3*60*1000,
};

module.exports = config;