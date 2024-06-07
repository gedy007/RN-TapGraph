import { Given } from '@wdio/cucumber-framework';
import { platform } from '../support/customSelector';

Given(/User on the Home Screen/, async () => {
  if (platform === 'ios') {
    await $('~Home, tab, 1 of 2').click();
  }

  if (platform === 'android') {
    await $('~Home').click();
  }
});
