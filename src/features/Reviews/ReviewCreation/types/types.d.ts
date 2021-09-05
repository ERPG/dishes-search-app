import { StackNavigationProp } from '@react-navigation/stack';
import { IRestaurant, IDish } from '../../../../../types/api';

export interface ISuggestions {
  suggestions: any[];
}

export interface IReviewData {
  restaurant: IRestaurant;
  dish: IDish;
  rating: number;
  comment: string;
}

// type RestaurantScreenParamList = {
//   dishId?: number;
//   dishName?: string;
// };
// type IRestaurantScreenProps = StackScreenProps<
//   RestaurantScreenParamList,
//   'RestauranScreen'
// >;

// type ReviewScreenParamList = {
//   dishId?: number;
//   dishName?: string;
//   restaurantId?: number;
//   restaurantName?: string;
//   restaurantAddress?: string;
// };
// export type IReviewScreenProps = StackScreenProps<
//   ReviewScreenParamList,
//   'ReviewScreen'
// >;

export interface IProps {
  navigation?: StackNavigationProp<any, any>;
}

export interface IReviewContext {
  reviewState: IReviewData;
  setReviewState: React.Dispatch<React.SetStateAction<IReviewData>>;
}

export interface IImageFromGallery {
  source: string;
  storedSource?: string;
}
