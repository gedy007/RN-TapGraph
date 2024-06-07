class gestures {
  /**
   * Check if an element is visible and if not wipe up a portion of the screen to
   * check if it visible after x amount of scrolls
   */
  static async checkIfDisplayedWithSwipe({
    scrollContainer,
    searchableElement,
    maxScrolls,
    amount = 0,
    direction = 'down',
    // Never scroll from the exact top or bottom of the screen, you might trigger the notification bar or other OS/App features
    percentage = 0.99,
  }) {
    // If the element is not displayed and we haven't scrolled the max amount of scrolls
    // then scroll and execute the method again
    if (!(await searchableElement.isDisplayed()) && amount <= maxScrolls) {
      // 1. Determine the percentage of the scrollable container to be scrolled
      // The scroll percentage is the percentage of the scrollable container that should be scrolled
      let scrollPercentage;
      if (isNaN(percentage)) {
        console.log('\nThe percentage to scroll should be a number.\n');
        // Never scroll from the exact top or bottom of the screen, you might trigger the notification bar or other OS/App features
        scrollPercentage = 0.99;
      } else if (percentage > 1) {
        console.log(
          '\nThe percentage to scroll should be a number between 0 and 1.\n'
        );
        // Never scroll from the exact top or bottom of the screen, you might trigger the notification bar or other OS/App features
        scrollPercentage = 0.99;
      } else {
        scrollPercentage = 1 - percentage;
      }

      // 2. Determine the swipe coordinates
      //    When we get the element rect we get the position of the element on the screen based on the
      //    - x (position from the left of the screen)
      //    - y (position from the top of the screen)
      //    - width (width of the element)
      //    - height (height of the element)
      //    We can use this to calculate the position of the swipe by determining the
      //    - top
      //    - right
      //    - bottom
      //    - left
      //    of the element. These positions will contain the x and y coordinates on where to put the finger
      const { x, y, width, height } = await driver.getElementRect(
        scrollContainer.elementId
      );
      // It's always advisable to swipe from the center of the element.
      const scrollRectangles = {
        // The x is the center of the element,
        // The y is the y of the element + the height of the element * the scroll percentage
        top: {
          x: Math.round(x + width / 2),
          y: Math.round(y + height * scrollPercentage),
        },
        // The x is the x of the element + the width of the element, minus the width of the element * the scroll percentage
        // The y is the center of the element,
        right: {
          x: Math.round(x + width - width * scrollPercentage),
          y: Math.round(y + height / 2),
        },
        // The x is the center of the element,
        // The y is the y of the element, plus the height, minus the height of the element * the scroll percentage
        bottom: {
          x: Math.round(x + width / 2),
          y: Math.round(y + height - height * scrollPercentage),
        },
        // The x is the x of the element, plus the width of the element * the scroll percentage
        // The y is the center of the element,
        left: {
          x: Math.round(x + width * scrollPercentage),
          y: Math.round(y + height / 2),
        },
      };

      // 3. Swipe in the given direction
      if (direction === 'down') {
        await this.executeGesture({
          from: scrollRectangles.top,
          to: scrollRectangles.bottom,
        });
      } else if (direction === 'left') {
        await this.executeGesture({
          from: scrollRectangles.right,
          to: scrollRectangles.left,
        });
      } else if (direction === 'right') {
        await this.executeGesture({
          from: scrollRectangles.left,
          to: scrollRectangles.right,
        });
      } else if (direction === 'up') {
        await this.executeGesture({
          from: scrollRectangles.bottom,
          to: scrollRectangles.top,
        });
      } else {
        console.log(
          '\nThe direction to scroll should be one of the following: down, left, right or up.\n'
        );
      }

      // 4. Check if the element is visible or swipe again
      await this.checkIfDisplayedWithSwipe({
        scrollContainer,
        searchableElement,
        maxScrolls,
        amount: amount + 1,
        direction,
        percentage,
      });
    } else if (amount > maxScrolls) {
      // If the element is still not visible after the max amount of scroll let it fail
      throw new Error(
        `The element '${searchableElement}' could not be found or is not visible.`
      );
    }

    // The element was found, proceed with the next action
  }

  /**
   * Execute a gesture on the screen from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
   *
   * There are two ways to execute a gesture:
   * 1. The "clean and easy" way
   * 2. The "verbose" way
   *
   * The "clean and easy" way is the recommended way to execute a gesture. It is easier to read and understand.
   * The "verbose" way is the way the Appium server expects the gesture to be send to the server and this is also how the "clean" way is translated to.
   */
  static async executeGesture({ from, to }) {
    // The "clean" way
    await driver
      // a. Create the event
      .action('pointer')
      // b. Move finger into start position
      .move(from.x, from.y) // This can also be written as .move({ x:from.x, y:from.y }) which allows you to add more options
      // c. Finger comes down into contact with screen
      .down() // This can also be written as .down({ button:0 }) which allows you to add more options
      // d. Pause for a little bit
      .pause(100)
      // e. Finger moves to end position
      // IMPORTANT. The default duration, if you don't provide it, is 100ms. This means that the movement will be so fast that it:
      // - might not be registered
      // - might not have the correct result on longer movements.
      // Short durations will move elements on the screen over longer move coordinates very fast.
      // Play with the duration to make the swipe go slower / faster
      .move({ duration: 1000, x: to.x, y: to.y })
      // f. Finger gets up, off the screen
      .up() // this can also be written as .up({ button:0 }) which allows you to add more options
      // g. Perform the action
      .perform();

    // Add a pause, just to make sure the swipe is done
    await driver.pause(1000);
  }
}

export default gestures;
