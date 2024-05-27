import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import store from '../redux/store';

import Tabs from '../navigation/tabs';

const fetchFonts = () => {
  return Font.loadAsync({
    helvetica: require('../../assets/fonts/Helvetica.ttf'),
  });
};

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await preventAutoHideAsync();
        await fetchFonts();
        setAppIsReady(true);
        await hideAsync();
      } catch (e) {
        console.warn('Error while preparing the app:', e);
      }
    }
    prepare();
  }, []);

  if (!appIsReady && Platform.OS === 'android') {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Tabs />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
