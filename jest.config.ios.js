process.env.PLATFORM = 'ios';

const config = {
    testMatch: [ "**/__e2e__/wd.test.js" ],
    testTimeout: 3*60*1000,
};

module.exports = config;