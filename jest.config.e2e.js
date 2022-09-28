const config = {
    preset: "jest-puppeteer",
    verbose: true,
    testMatch: [ "**/__e2e__/e2e.test.js" ],
    setupFilesAfterEnv: ["expect-puppeteer"]
};

module.exports = config;