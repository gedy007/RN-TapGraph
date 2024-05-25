import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },
  header: {
    padding: 15,
    color: COLORS.white,
    ...FONTS.h1,
    fontWeight: '200',
  },
  bookContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  orderList: {
    flex: 1,
    marginHorizontal: 8,
    marginTop: 32,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  rowButton: {
    flexDirection: 'row',
    position: 'absolute',
    top: 630,
    left: 8,
    right: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ask: {
    backgroundColor: '#ffe6e6',
  },
  bid: {
    backgroundColor: '#e6ffe6',
  },
  price: {
    flex: 1,
    textAlign: 'right',
    ...FONTS.body4,
  },
  volume: {
    flex: 1,
    textAlign: 'right',
    ...FONTS.body4,
  },
  sectionHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 8,
    color: COLORS.white,
    ...FONTS.h3,
    fontWeight: 'bold',
  },
  flatListHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.secondary,
  },
  flatListHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
  },
  buttonBid: {
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    width: 180,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonAsk: {
    backgroundColor: COLORS.red,
    paddingVertical: 10,
    width: 180,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
