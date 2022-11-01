const webdriverio = require('webdriverio');
const NodeEnvironment = require('jest-environment-node');

const driverConfig = require('./__e2e__/config');

class CustomEnvironment extends NodeEnvironment {
  timeout = 10000;
  constructor(config, context) {
    super(config, context);
    this.client;
    this.failedTestsCount = 0;
  }

  async setup() {
    await super.setup();
    console.log('driverConfig', driverConfig);
    this.client = await webdriverio.remote(driverConfig);
    this.global.client = this.client;
    this.global.timeout = this.timeout

    if (process.env.PLATFORM === 'chrome') {
      await this.openExtensionPage();
    }

    this.client.getElementByTestId = async (testId) => {
      let selector = '';
      if (process.env.PLATFORM === 'chrome') {
        selector = `[data-testid='${testId}']`;
      }
      if (process.env.PLATFORM === 'android') {
        selector = `android=new UiSelector().resourceId("${testId}")`;
      }
      if (process.env.PLATFORM === 'ios') {
        selector = `~${testId}`;
      }
      const element = await this.client.$(selector);
      await element.waitForExist({timeout: this.timeout});
      return element;
    }

    this.client.getElementByTextContains = async (text) => {
      let selector = '';
      if (process.env.PLATFORM === 'chrome') {
        selector = `//*[contains(text(),'${text}')]`; // https://www.webperformance.com/load-testing-tools/blog/articles/real-browser-manual/building-a-testcase/how-locate-element-the-page/xpath-locator-examples/
      }
      if (process.env.PLATFORM === 'android') {
        selector = `android=new UiSelector().textContains("${text}")`; // https://developer.android.com/reference/androidx/test/uiautomator/UiSelector?hl=en
      }
      if (process.env.PLATFORM === 'ios') {
        selector = `-ios predicate string:name CONTAINS '${text}'`; // https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html
      }
      const element = await this.client.$(selector);
      await element.waitForExist({timeout: this.timeout});
      return element;
    }

    this.client.getElementByText = async (text) => {
      let selector = '';
      if (process.env.PLATFORM === 'chrome') {
        selector = `//*[text()='${text}']`;
      }
      if (process.env.PLATFORM === 'android') {
        selector = `android=new UiSelector().text("${text}")`;
      }
      if (process.env.PLATFORM === 'ios') {
        selector = `-ios predicate string:name == '${text}'`;
      }
      const element = await this.client.$(selector);
      await element.waitForExist({timeout: this.timeout});
      return element;
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