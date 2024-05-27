import React from 'react';
import { Animated, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SIZES } from '../../constants';

const MainLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {children}

      {/* Modal */}
      <Animated.View style={styles.modal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  modal: {
    position: 'absolute',
    left: 0,
    width: '100%',
    padding: SIZES.padding,
  },
});

export default MainLayout;
