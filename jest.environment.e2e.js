const webdriverio = require('webdriverio');
const NodeEnvironment = require('jest-environment-node');

const driverConfig = require('./__e2e__/config');

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.client;
    this.failedTestsCount = 0;
  }

  async setup() {
    await super.setup();
    this.client = await webdriverio.remote(driverConfig);
    this.global.client = this.client;
    this.global.timeout = 10000;


    if (process.env.PLATFORM === 'chrome') {
      await this.openExtensionPage();
    }

    this.client.$$$ = (ariaLabel) => {
      return process.env.PLATFORM === 'chrome' ? this.client.$(`aria/${ariaLabel}`) : this.client.$(`~${ariaLabel}`)
    }
  }

  async markSauceTask() {
    const result = this.failedTestsCount > 0 ? 'failed' : 'passed';
    await this.client.execute(`sauce:job-result=${result}`)
  }

  async teardown() {
    if (process.env.SAUCE) {
      await this.markSauceTask();
    }

    await this.client.deleteSession();
    await super.teardown();
  }

  async handleTestEvent(event, state) {
    if (event.name === 'test_fn_failure') {
      this.failedTestsCount++;
    }
  }

  async openExtensionPage() {
    await this.client.url('http://google.com')
    const puppeteer = await this.client.getPuppeteer()

    const targets = await puppeteer.targets();
    const extensionTarget = targets.find(target => target.type() === 'service_worker');
    const partialExtensionUrl = extensionTarget.url() || '';
    const [, , extensionId] = partialExtensionUrl.split('/');

    const extPage = await puppeteer.newPage();
    const extensionUrl = `chrome-extension://${extensionId}/index.html`;
    await extPage.goto(extensionUrl, { waitUntil: 'load' });
  }
}

module.exports = CustomEnvironment;