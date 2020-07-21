import {Dimensions, PixelRatio, Platform, StatusBar} from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight =
  Platform.OS !== 'ios' &&
  Dimensions.get('screen').height !== Dimensions.get('window').height &&
  StatusBar.currentHeight > 24
    ? Dimensions.get('screen').height - StatusBar.currentHeight
    : Dimensions.get('window').height;

const percentageCalculation = (max, val) => max * (val / 100);

const isIphoneX = () => {
  const iphoneXLength = 812;
  const iphoneXSMaxLength = 896;
  const windowDimensions = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (windowDimensions.width === iphoneXLength ||
      windowDimensions.height === iphoneXLength ||
      windowDimensions.width === iphoneXSMaxLength ||
      windowDimensions.height === iphoneXSMaxLength)
  );
};

const fontCalculation = (height, width, val) => {
  const widthDimension = height > width ? width : height;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;

  return Math.floor(
    percentageCalculation(
      Math.sqrt(
        Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2),
      ),
      val,
    ),
  );
};

const widthPercentageToDP = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const isIos = Platform.OS === 'ios';

const isAndroid = Platform.OS === 'android';

const responsiveFontSize = fz => fontCalculation(screenHeight, screenWidth, fz);

const tabBarHeight = Platform.OS === 'ios' ? 17 : 20;
const bottomAreaHeight = Platform.OS === 'ios' && isIphoneX() ? 34 : 0;
const safeAreaBottomHeight = Platform.OS === 'ios' && isIphoneX() ? 35 : 0;
const safeAreaTopHeight = Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0;

export default {
  isIos,
  isAndroid,
  screenWidth,
  screenHeight,
  responsiveFontSize,
  widthPercentageToDP,
  heightPercentageToDP,
  safeAreaTopHeight,
  safeAreaBottomHeight,
  tabBarHeight,
  bottomAreaHeight,
};
