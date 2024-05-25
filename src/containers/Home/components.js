import { StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'auto',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: SIZES.radius,
    paddingBottom: 10,
  },
  day: {
    color: COLORS.white,
    ...FONTS.h2,
    fontWeight: '800',
  },
  date: {
    color: COLORS.white,
    ...FONTS.h3,
    fontWeight: '800',
  },
  chartSymbolContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  coinSymbol: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.lightGray3,
    paddingLeft: 15,
    paddingTop: 15,
    textTransform: 'uppercase',
  },
  currentPrice: {
    fontSize: 20,
    color: '#f0f0f0',
    paddingLeft: 15,
    paddingTop: 5,
  },
  chartContainer: {
    marginBottom: SIZES.radius,
  },
  coinItemContainer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinLogo: {
    height: 20,
    width: 20,
  },
  coinName: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  coinFiguresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  coinPrice: {
    textAlign: 'right',
    color: COLORS.white,
    ...FONTS.h4,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    height: 10,
    width: 10,
    marginLeft: 5,
  },
  priceChange: {
    marginLeft: 5,
    ...FONTS.body5,
    lineHeight: 15,
  },
  flatListHeaderContainer: {
    marginBottom: SIZES.radius,
  },
  flatListTitle: {
    color: COLORS.white,
    ...FONTS.h3,
    fontSize: 18,
  },
  contentContainerStyle: {
    marginTop: 10,
    paddingHorizontal: SIZES.padding,
  },
  header: {
    padding: 15,
    color: COLORS.white,
    ...FONTS.h1,
    fontWeight: '200',
  },
});
