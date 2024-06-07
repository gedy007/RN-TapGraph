import { $ } from '@wdio/globals';
import { Then } from '@wdio/cucumber-framework';
import { byTestID, byText } from '../support/customSelector.js';

Then(
  /^User should see text (.+) and component "(.+)"$/,
  async (text, component) => {
    await expect($(byText(text))).toBeDisplayed();
    await expect($(byTestID(component))).toBeDisplayed();
  }
);

Then(/^User should be able to see text (.+)$/, async text => {
  await expect($(byText(text))).toBeDisplayed();
});
