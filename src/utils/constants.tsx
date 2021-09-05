import { Dimensions } from 'react-native';

export const signUpInitialState: Readonly<any> = [
  { nameValid: true, nameEmpty: false },
  { emailValid: true, emailEmpty: false },
  { passwordValid: true, passwordEmpty: false },
];

export enum EnvUris {
  PICTURE_BASE_URI = 'https://npkgstatic-pre.monsieur-hibou.com/reviews',
  PICTURE_THUMBNAIL_BASE_URI = 'https://npkgstatic-pre.monsieur-hibou.com/reviews/thumbnails',
  PICTURE_EMPTY_URI = 'https://s3.amazonaws.com/FringeBucket/image_placeholder.png',
}

export const MIN_SEARCH_CHARACTER_LENGTH = 2;

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
