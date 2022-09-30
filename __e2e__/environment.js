import NodeEnvironment from 'jest-environment-node';

let failedTestsCount = 0;

class MyCustomEnvironment extends NodeEnvironment {
  async handleTestEvent(event, state) {
    if (event.name === 'test_fn_failure') {
      failedTestsCount++;
    }

    if (event.name === 'teardown') {
      console.log('teardown', failedTestsCount);
    }
  }
}

module.exports = MyCustomEnvironment;