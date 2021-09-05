import { StackNavigationProp } from "@react-navigation/stack";
import { IRestaurant, IDish } from "../../../../../types/api";

export interface ISuggestions {
  suggestions: any[];
}

export interface IReviewData {
  restaurant: IRestaurant;
  dish: IDish;
  rating: number;
  comment: string;
}

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
