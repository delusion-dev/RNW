const config = {
    preset: "jest-puppeteer",
    verbose: true,
    testMatch: [ "**/__e2e__/**/*.tsx" ],
    setupFilesAfterEnv: ["expect-puppeteer"]
};

module.exports = config;