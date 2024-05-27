import React from 'react';
import { Image, Platform } from 'react-native';
import { COLORS } from '../../constants';

const TabMenu = ({ focused, icon, iconStyle }) => {
  const iconSize = Platform?.OS === 'Android' ? 30 : 25;
  return (
    <Image
      source={icon}
      resizeMode="contain"
      style={{
        width: iconSize,
        height: iconSize,
        tintColor: focused ? COLORS.white : COLORS.lightGray3,
        ...iconStyle,
      }}
    />
  );
};

export default TabMenu;
