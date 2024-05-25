import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#1E1E1E',
  secondary: '#3B3B3B',

  white: '#fff',
  green: '#28a745',
  lightGreen: '#4BEE70',
  red: '#D84035',
  black: '#000000',
  darkBlue: '#2B52D4',
  lightBlue: '#2BA6D4',
  purple: '#592BD4',
  lightPurple: '#8E41BE',
  gray: '#212125',
  gray1: '#1f1f1f',
  lightGray: '#3B3B3B',
  lightGray2: '#212125',
  lightGray3: '#757575',
  transparentWhite: 'rgba(255, 255, 255, 0.2)',
  transparentBlack: 'rgba(0, 0, 0, 0.8)',
  transparentBlack1: 'rgba(0, 0, 0, 0.4)',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {
    fontFamily: 'helvetica',
    fontSize: SIZES.largeTitle,
    fontWeight: '800',
  },
  h1: {
    fontFamily: 'helvetica',
    fontSize: SIZES.h1,
    lineHeight: 36,
  },
  h2: {
    fontFamily: 'helvetica',
    fontSize: SIZES.h2,
    lineHeight: 30,
  },
  h3: {
    fontFamily: 'helvetica',
    fontSize: SIZES.h3,
    lineHeight: 22,
  },
  h4: {
    fontFamily: 'helvetica',
    fontSize: SIZES.h4,
    lineHeight: 22,
  },
  h5: {
    fontFamily: 'helvetica',
    fontSize: SIZES.h5,
    lineHeight: 22,
  },
  body1: {
    fontFamily: 'helvetica',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'helvetica',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'helvetica',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'helvetica',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'helvetica',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

export const GLOBALSTYLES = {
  flex: {
    flex: 1,
  },
};

const appTheme = {
  COLORS,
  SIZES,
  FONTS,
  GLOBALSTYLES,
};

export default appTheme;
