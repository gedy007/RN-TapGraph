export const platform = driver.capabilities.platformName.toLowerCase();

export const byTestID = id => {
  if (platform === 'ios') {
    return `~${id}`;
  }

  if (platform === 'android') {
    return `android=new UiSelector().resourceId("${id}")`;
  }

  return null;
};

export const byText = text => {
  if (platform === 'ios') {
    const selector = `name BEGINSWITH '${text}'`;
    const textSelector = `-ios predicate string:${selector}`;
    return textSelector;
  }

  if (platform === 'android') {
    return `android=new UiSelector().text("${text}")`;
  }

  return null;
};
