import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { setModalVisibility } from '../redux/tab/tabActions';

import Home from '../containers/Home';
import OrderBook from '../containers/OrderBook';

import TabMenu from '../components/TabMenu';
import { COLORS, images } from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
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
              <TabMenu
                focused={focused}
                icon={images.home}
                label="Home"
                isHome={true}
              />
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

function mapStateToProps(state) {
  return {
    isModalVisible: state.tabReducer.isModalVisible,
    selectedCoin: state.marketReducer.selectedCoin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setModalVisibility: isVisible => {
      return dispatch(setModalVisibility(isVisible));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
