import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { useFocusEffect } from '@react-navigation/native';
import { useCandlestickStream } from '../../services/useWebSocket';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '../../constants';

const CandleChart = ({ symbol }) => {
  const { candlestickData, startCandlestickStream, stopCandlestickStream } =
    useCandlestickStream(symbol);

  useFocusEffect(
    React.useCallback(() => {
      startCandlestickStream();
      return () => stopCandlestickStream();
    }, [symbol])
  );

  return (
    <View style={{ height: 220 }}>
      <GestureHandlerRootView>
        <CandlestickChart.Provider data={candlestickData ?? []}>
          <CandlestickChart.PriceText
            type="open"
            format={({ value }) => {
              'worklet';
              return `Open: ${value}`;
            }}
            style={styles.priceText}
          />

          <CandlestickChart.PriceText
            type="high"
            format={({ value }) => {
              'worklet';
              return `High: ${value}`;
            }}
            style={styles.priceText}
          />
          <CandlestickChart.PriceText
            type="low"
            format={({ value }) => {
              'worklet';
              return `Low: ${value}`;
            }}
            style={styles.priceText}
          />
          <CandlestickChart.PriceText
            type="close"
            format={({ value }) => {
              'worklet';
              return `Close: ${value}`;
            }}
            style={styles.priceText}
          />
          <CandlestickChart.DatetimeText
            textAlign="left"
            style={styles.priceText}
          />
          <CandlestickChart height={100}>
            <CandlestickChart.Candles />
            <CandlestickChart.Crosshair>
              <CandlestickChart.Tooltip />
            </CandlestickChart.Crosshair>
          </CandlestickChart>
        </CandlestickChart.Provider>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 9999,
    backgroundColor: COLORS.primary,
  },
  priceText: {
    color: COLORS.white,
    ...FONTS.body4,
    paddingHorizontal: 8,
  },
});

export default CandleChart;
