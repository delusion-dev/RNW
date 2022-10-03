const androidConfig = require('./android');
const iosConfig = require('./ios');

let SAUCE_USERNAME = 'oauth-developer1.apriorit-794aa';
let SAUCE_ACCESS_KEY = '37263e42-8411-470d-ac0f-484884224c39';

const localOptions =  {
  capabilities: process.env.PLATFORM === 'android' ? androidConfig.localCaps : iosConfig.localCaps,
  path: '/wd/hub',
  host: process.env.APPIUM_HOST || 'localhost',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'error'
};

const sauceOptions =  {
  capabilities: process.env.PLATFORM === 'android' ? androidConfig.sauceCaps : iosConfig.sauceCaps,
  protocol: "https",
  path: '/wd/hub',
  hostname: `${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com`,
  port: 443,
  region: 'eu',
};

const config = process.env.SAUCE ? sauceOptions : localOptions;

module.exports = config;