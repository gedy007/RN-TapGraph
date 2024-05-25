import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import moment from 'moment';

import { getCoinMarket } from '../../redux/market/marketActions';
import MainLayout from '../MainLayout';
import LineChartHome from '../../components/LineChartHome';
import { useUSDIDR } from '../../services/REST/useUSDIDR';

import { styles } from './components';
import { SIZES, COLORS, FONTS, images } from '../../constants';

const Home = ({ getCoinMarket, coins }) => {
  let dt = new Date();
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  const { usdIdrRate } = useUSDIDR();

  useFocusEffect(
    React.useCallback(() => {
      getCoinMarket();
    }, [])
  );

  let startUnixTimestamp = moment().subtract(7, 'day').unix();

  let data = selectedCoin
    ? selectedCoin?.sparkline_in_7d?.price?.map((item, index) => {
        return {
          timestamp: (startUnixTimestamp + (index + 1) * 3600) * 1000,
          value: item * usdIdrRate,
        };
      })
    : [];

  return (
    <MainLayout>
      <View
        style={{
          backgroundColor: COLORS.black,
        }}
      >
        {/* HEADER CONTAINER */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'auto',
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
            {selectedCoin ? selectedCoin?.symbol : coins[0]?.symbol}
          </Text>
          <Text style={styles.currentPrice}>
            IDR{' '}
            {selectedCoin
              ? selectedCoin?.current_price.toLocaleString()
              : coins[0]?.current_price.toLocaleString()}
          </Text>
        </View>

        {/* Line Chart */}
        {data?.length > 0 ? <LineChartHome chartPrices={data} /> : null}

        {/* Watchlist */}
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainerStyle}
          ListHeaderComponent={
            <View
              style={{
                marginBottom: SIZES.radius,
              }}
            >
              <Text style={styles.flatListTitle}>Top Cryptocurrency</Text>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                style={styles.coinItemContainer}
                onPress={() => setSelectedCoin(item)}
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
                <View style={{ flex: 1 }}>
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
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
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
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
