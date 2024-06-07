import { $ } from '@wdio/globals';
import { When } from '@wdio/cucumber-framework';
import { byTestID, byText } from '../support/customSelector.js';
import gestures from '../support/gestures.js';

When(/^User tap (\w+) in the CoinMarketFlatList$/, async coin => {
  await $(byTestID('HomeHeader')).waitForExist();
  await $(byText(coin)).click();
});

When(
  /^User swipes "(up|left|right|down)" the "(.+)" until (.+)$/,
  async (direction, component, destination) => {
    await gestures.checkIfDisplayedWithSwipe({
      scrollContainer: await $(byTestID(component)),
      searchableElement: await $(byText(destination)),
      maxScrolls: 5,
      direction: direction,
      percentage: 0.4,
    });
  }
);

When(/^User swipes until (.+)$/, async destination => {
  await $(byTestID(destination)).scrollIntoView();
});
