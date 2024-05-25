import React from 'react';
import {View, Image} from 'react-native';
import {COLORS} from '../../constants';

const TabMenu = ({
  focused,
  icon,
  iconStyle,
  isHome,
}) => {
  if (isHome) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused
              ? COLORS.white
              : COLORS.lightGray3,
            ...iconStyle,
          }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused
              ? COLORS.white
              : COLORS.lightGray3,
            ...iconStyle,
          }}
        />
      </View>
    );
  }
};

export default TabMenu;
