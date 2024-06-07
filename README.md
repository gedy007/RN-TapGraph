# Welcome to my dummy app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).


## E2E Test: Appium + WebDriverIO + Cucumber.js

### Prerequisite:

```bash
npm install -g appium
```

### To build apps locally for test:

```bash
npm run prebuild
eas build
npm run ios 
npm run android
```

### Start Appium server

```bash
appium -p 4726
```

### E2E scripts:

```bash
npm run wdio-ios
npm run wdio-android
```

More Boilerplate:\
https://github.com/webdriverio/cucumber-boilerplate/ \
https://github.com/webdriverio/appium-boilerplate/
