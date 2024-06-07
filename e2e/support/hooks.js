import { Before } from '@wdio/cucumber-framework';

Before(async function (scenario) {
  await driver.terminateApp('com.rntapgraph');
  await driver.activateApp('com.rntapgraph');
  console.log(`Starting scenario: ${scenario.name}`);
});
