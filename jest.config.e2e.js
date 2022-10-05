const config = {
    testEnvironment: './jest.environment.e2e.js',
    testMatch: [ "**/__e2e__/e2e.test.js" ],
    testTimeout: 3*60*1000,
};

module.exports = config;