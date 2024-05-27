import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../containers/Home';
import OrderBook from '../containers/OrderBook';
import TabMenu from '../components/TabMenu';
import { COLORS, images } from '../constants';

const Tab = createBottomTabNavigator();

export default Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          flex: Platform.OS === 'android' ? 1 : null,
          fontSize: 14,
          fontWeight: 'bold',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.lightGray3,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabMenu focused={focused} icon={images.home} label="Home" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Order Book"
        component={OrderBook}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabMenu
                focused={focused}
                icon={images.list}
                label="Order Book"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
