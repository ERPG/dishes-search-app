import { IReview } from './../../types/api';
import {
  createRecord,
  authenticate,
  ssoAuthenticate,
  getList,
  search,
  getOne,
  uploadReviewPicture,
  getCurrentUser,
  passwordRecoveryAction,
  passwordRecoveryEmail,
  changePassword,
} from 'napking-api-requests';

import { Resources } from './Constants';
import { API_URL } from 'react-native-dotenv';
import { IDish, IRating, IUser, IRestaurant } from '../../types/api';

// Search dish suggestions
export const SearchDish = (dish: string) => {
  return search<IDish>(
    API_URL,
    Resources.DISH,
    'name_contains',
    [{ name: 'term', value: dish }],
    [{ name: 'name', direction: 'asc' }]
  );
};
// Search restaurants suggestions
export const SearchRestaurant = (restaurant: string) => {
  return search<IRestaurant>(
    API_URL,
    Resources.RESTAURANT,
    'name_contains',
    [{ name: 'term', value: restaurant }],
    [{ name: 'name', direction: 'asc' }]
  );
};
// Create a new Review
export const CreateReview = (
  dishId: number,
  restaurantId: number,
  rating: number,
  comment: string,
  token: string
) => {
  return createRecord<IReview>(
    API_URL,
    Resources.REVIEW,
    {
      dishId,
      restaurantId,
      rating,
      comment,
    },
    token
  );
};

// Create new Dish
export const CreateDish = (name: string, token: string) => {
  return createRecord<IDish>(
    API_URL,
    Resources.DISH,
    {
      name,
    },
    token
  );
};

// Sign Up with email and password
export const SignUpWithEmailAndPassword = (
  email: string,
  password: string,
  name: string
) => {
  return createRecord<IUser>(API_URL, Resources.USER, {
    name,
    email,
    password,
  });
};

// Sign In with email and password
export const SignInWithEmailAndPassword = (email: string, password: string) => {
  return authenticate(API_URL, email, password);
};

// Sign In with Google, Facebook etc
export const SignInWithExternalApp = (appName: string, accessToken: string) => {
  return ssoAuthenticate(API_URL, appName, accessToken);
};

// Get Dish ratings
export const GetDishRatings = (id: number) => {
  return getList<IRating>(
    API_URL,
    Resources.RATING,
    [
      { name: 'dish.id', value: id },
      { name: 'projection', value: 'rating.pictures' },
    ],
    [{ name: 'rating', direction: 'desc' }]
  );
};

export const GetDishReviews = async (dishId: number, restaurantId: number) => {
  return await getList<IReview>(
    API_URL,
    Resources.REVIEW,
    [
      { name: 'dish.id', value: dishId },
      { name: 'restaurant.id', value: restaurantId },
      { name: 'projection', value: 'review.userpictures' },
    ],
    [{ name: 'date', direction: 'desc' }]
  );
};

export const GetUserDishReviews = async (userId: number) => {
  return getList<IReview>(
    API_URL,
    Resources.REVIEW,
    [
      { name: 'user.id', value: userId },
      { name: 'projection', value: 'review.dishrestaurantpictures' },
    ],
    [{ name: 'date', direction: 'desc' }]
  );
};

export const GetUsers = (users: { name: string; value: number }[]) => {
  return getList<IUser>(API_URL, Resources.USER, users);
};

export const GetUser = (userId: number) => {
  return getOne<IUser>(API_URL, Resources.USER, userId);
};

export const UploadReviewPicture = (
  reviewId: number,
  image: Blob,
  token: string
) => {
  return uploadReviewPicture<any>(API_URL, reviewId, image, token);
};

export const GetCurrentUser = (token: string) => {
  return getCurrentUser<IUser>(API_URL, token);
};

export const passwordRecoverySendEmail = (email: string) => {
  return passwordRecoveryEmail<void>(API_URL, email);
};

export const passwordRecoveryUpdateAction = (
  password: string,
  hash: string
) => {
  return passwordRecoveryAction<void>(API_URL, password, hash);
};

export const ChangePassword = (
  currentPassword: string,
  newPassword: string,
  userId: any,
  token: string
) => {
  return changePassword(API_URL, userId, currentPassword, newPassword, token);
};
