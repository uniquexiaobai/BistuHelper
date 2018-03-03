import {Dimensions, PixelRatio} from 'react-native';

export const screenWidth = Dimensions
  .get('window')
  .width;
export const screenHeight = Dimensions
  .get('window')
  .height;

export const pixelWidth = 1 / PixelRatio.get();
