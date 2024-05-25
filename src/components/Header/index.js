import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    padding: 15,
    marginRight: 230,
  },
  text: {
    color: COLORS.white,
    ...FONTS.h1,
    fontWeight: '200',
    letterSpacing: 1,
    textAlign: 'left',
  },
});

export default Header;
