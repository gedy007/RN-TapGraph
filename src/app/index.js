import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';

import Tabs from '../navigation/tabs';

const fetchFonts = async () => {
  return Font.loadAsync({
    helvetica: require('../../assets/fonts/Helvetica.ttf'),
  });
};

if (__DEV__) {
  require('../../ReactotronConfig');
}

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
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
    }
  }, []);

  if (!appIsReady && Platform.OS === 'android') {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Tabs />
    </SafeAreaProvider>
  );
};

export default App;
