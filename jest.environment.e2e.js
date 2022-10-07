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

    if (process.env.PLATFORM === 'chrome') {
      await this.openExtensionPage();
    }

    this.client.getElementByTestId = (testId) => {
      if (process.env.PLATFORM === 'chrome') {
        return this.client.$(`[data-testid='${testId}']`)
      }
      if (process.env.PLATFORM === 'android') {
        return this.client.$(`android=new UiSelector().resourceId("${testId}")`)
      }
      if (process.env.PLATFORM === 'ios') {
        return this.client.$(`~${testId}`)
      }
    }

    this.client.getElementByTextContains = (text) => {
      if (process.env.PLATFORM === 'chrome') {
        return this.client.$(`//*[contains(text(),'${text}')]`) // https://www.webperformance.com/load-testing-tools/blog/articles/real-browser-manual/building-a-testcase/how-locate-element-the-page/xpath-locator-examples/
      }
      if (process.env.PLATFORM === 'android') {
        return this.client.$(`android=new UiSelector().textContains("${text}")`) // https://developer.android.com/reference/androidx/test/uiautomator/UiSelector?hl=en
      }
      if (process.env.PLATFORM === 'ios') {
        return this.client.$(`-ios predicate string:name CONTAINS '${text}'`) // https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Predicates/Articles/pSyntax.html
      }
    }

    this.client.getElementByText = (text) => {
      if (process.env.PLATFORM === 'chrome') {
        return this.client.$(`//*[text()='${text}']`)
      }
      if (process.env.PLATFORM === 'android') {
        return this.client.$(`android=new UiSelector().text("${text}")`)
      }
      if (process.env.PLATFORM === 'ios') {
        return this.client.$(`-ios predicate string:name == '${text}'`)
      }
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