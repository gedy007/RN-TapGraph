import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-wagmi-charts';
import { View } from 'react-native';
import { COLORS } from '../../constants';

export default LineChartHome = ({ chartPrices }) => {
  return (
    <View style={{ height: 120 }}>
      <GestureHandlerRootView>
        <LineChart.Provider data={chartPrices}>
          <LineChart height={120}>
            <LineChart.Path color={COLORS.white} />
            <LineChart.CursorCrosshair color={COLORS.white}>
              <LineChart.Tooltip
                yGutter={-200}
                cursorGutter={50}
                textStyle={{
                  color: COLORS.white,
                  backgroundColor: COLORS.black,
                }}
                format={({ value }) => {
                  'worklet';
                  return `IDR ${value}`;
                }}
              />
              <LineChart.Tooltip
                yGutter={-200}
                position="bottom"
                textStyle={{
                  color: COLORS.white,
                  backgroundColor: COLORS.black,
                }}
              >
                <LineChart.DatetimeText
                  locale="en-AU"
                  style={{
                    color: COLORS.white,
                    backgroundColor: COLORS.black,
                  }}
                  format={({ value }) => {
                    'worklet';
                    return new Date(value).toLocaleString('en-AU', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                />
              </LineChart.Tooltip>
            </LineChart.CursorCrosshair>
          </LineChart>
        </LineChart.Provider>
      </GestureHandlerRootView>
    </View>
  );
};
