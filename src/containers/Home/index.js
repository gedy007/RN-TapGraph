import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import useCoinMarket from '../../services/rest/useCoinMarket';
import MainLayout from '../../components/MainLayout';
import LineChartHome from '../../components/LineChartHome';
import { useUSDIDR } from '../../services/rest/useUSDIDR';

import { styles } from './components';
import { SIZES, COLORS, FONTS, images } from '../../constants';

export default Home = () => {
  let dt = new Date();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { usdIdrRate } = useUSDIDR();
  const { coinMarketData, loading } = useCoinMarket();

  useEffect(() => {
    handleSelectedCoin('retrieve');
  }, []);

  const handleSelectedCoin = async (action, coin = null) => {
    try {
      if (action === 'retrieve') {
        const jsonValue = await AsyncStorage.getItem('selectedCoin');
        if (jsonValue !== null) {
          const parsedCoin = JSON.parse(jsonValue);
          setSelectedCoin(parsedCoin);
        }
      } else if (action === 'save' && coin) {
        const jsonValue = JSON.stringify(coin);
        await AsyncStorage.setItem('selectedCoin', jsonValue);
        setSelectedCoin(coin);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startUnixTimestamp = moment().subtract(7, 'day').unix();

  const data = selectedCoin
    ? selectedCoin?.sparkline_in_7d?.price?.map((item, index) => {
        return {
          timestamp: (startUnixTimestamp + index * 3600) * 1000,
          value: item * usdIdrRate,
        };
      })
    : [];

  return (
    <MainLayout>
      {loading ? (
        <Loading />
      ) : (
        <View
          style={{
            backgroundColor: COLORS.black,
          }}
        >
          {/* HEADER CONTAINER */}
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text style={styles.header}>Home</Text>

            <View style={styles.dateContainer}>
              <Text style={styles.day}>{moment(dt).format('dddd')}</Text>
              <Text style={styles.date}>{moment(dt).format('D MMMM')}</Text>
            </View>
          </View>

          {/* Chart Symbol */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.coinSymbol}>
              {'\u0024'}
              {selectedCoin ? selectedCoin?.symbol : coinMarketData[0]?.symbol}
            </Text>
            <Text style={styles.currentPrice}>
              IDR{' '}
              {selectedCoin
                ? selectedCoin?.current_price.toLocaleString()
                : coinMarketData[0]?.current_price.toLocaleString()}
            </Text>
          </View>

          {/* Line Chart */}
          {data?.length > 0 ? <LineChartHome chartPrices={data} /> : null}

          {/* Watchlist */}
          <FlatList
            data={coinMarketData}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.contentContainerStyle}
            ListHeaderComponent={
              <View
                style={{
                  marginBottom: SIZES.radius,
                }}
              >
                <Text style={styles.flatListTitle}>
                  Top Smart Contract Platform in 7d
                </Text>
              </View>
            }
            renderItem={({ item }) => {
              const priceColor =
                item.price_change_percentage_7d_in_currency == 0
                  ? COLORS.lightGray3
                  : item.price_change_percentage_7d_in_currency > 0
                  ? COLORS.lightGreen
                  : COLORS.red;

              return (
                <TouchableOpacity
                  style={styles.coinItemContainer}
                  onPress={() => handleSelectedCoin('save', item)}
                >
                  {/* Logo */}
                  <View style={{ width: 25 }}>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        height: 20,
                        width: 20,
                      }}
                    />
                  </View>

                  {/* Name */}
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.coinName}>{item.name}</Text>
                  </View>

                  {/* Figures */}
                  <View>
                    <Text style={styles.coinPrice}>
                      IDR {item.current_price.toLocaleString()}
                    </Text>

                    <View style={styles.coinFiguresContainer}>
                      {item.price_change_percentage_7d_in_currency != 0 && (
                        <Image
                          source={images.upArrow}
                          style={{
                            height: 10,
                            width: 10,
                            tintColor: priceColor,
                            transform:
                              item.price_change_percentage_7d_in_currency > 0
                                ? [
                                    {
                                      rotate: '45deg',
                                    },
                                  ]
                                : [
                                    {
                                      rotate: '125deg',
                                    },
                                  ],
                          }}
                        />
                      )}
                      <Text
                        style={{
                          marginLeft: 5,
                          color: priceColor,
                          ...FONTS.body5,
                          lineHeight: 15,
                        }}
                      >
                        {item.price_change_percentage_7d_in_currency.toFixed(2)}
                        %
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  paddingBottom: data?.length > 0 ? 350 : 230,
                }}
              />
            }
          />
        </View>
      )}
    </MainLayout>
  );
};
