const webdriverio = require('webdriverio');
const NodeEnvironment = require('jest-environment-node').TestEnvironment;

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
}

module.exports = CustomEnvironment;