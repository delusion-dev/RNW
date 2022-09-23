const config = {
    preset: "jest-puppeteer",
    globals: { URL: "<http://localhost:8080>" },
    verbose: true,
    testMatch: [ "**/__e2e__/**/*.tsx" ]
};

module.exports = config;