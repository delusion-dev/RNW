const androidConfig = require('./android');
const iosConfig = require('./ios');
const path = require('path');
const extensionPath = path.resolve(__dirname, '../../dist');

const SAUCE_USERNAME = 'oauth-developer1.apriorit-794aa';
const SAUCE_ACCESS_KEY = '37263e42-8411-470d-ac0f-484884224c39';

const mobileLocalOptions = {
  capabilities: process.env.PLATFORM === 'android' ? androidConfig.localCaps : iosConfig.localCaps,
  path: '/wd/hub',
  host: process.env.APPIUM_HOST || 'localhost',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'error'
};

const mobileSauceOptions = {
  capabilities: process.env.PLATFORM === 'android' ? androidConfig.sauceCaps : iosConfig.sauceCaps,
  protocol: "https",
  path: '/wd/hub',
  hostname: `${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com`,
  port: 443,
  region: 'eu',
};

const chromeOptions = {
  automationProtocol: 'devtools',
  logLevel: 'error',
  capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
        headless: false,
        args: [
          '--no-sandbox',
          `--disable-extensions-except=${extensionPath}`,
          `--load-extension=${extensionPath}`,
        ],
        slowMo: 10, // slow down execution for debugging
      }
  }
}

let config = process.env.SAUCE ? mobileSauceOptions : mobileLocalOptions;

if (process.env.PLATFORM === 'chrome') {
  config = chromeOptions
}

module.exports = config;