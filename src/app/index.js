import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

import { View, Text, StyleSheet } from 'react-native';

import Tabs from '../navigation/tabs';

const App = () => {
  return (
    <Provider store={store}>
      <Tabs />
    </Provider>
  );
};

export default App;
