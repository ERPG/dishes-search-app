export interface IDish {
  name: string;
  id: number;
  thumbnail?: string;
}

export interface IRestaurant {
  name: string;
  id: number;
  address?: string;
  thumbnail?: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IRating {
  dishId: number;
  id: number;
  rating: number;
  restaurantAddress: string;
  restaurantName: string;
  restaurantId: number;
  restaurantLat: number;
  restaurantLng: number;
  reviewsCount: number;
  pictures: IPicture[];
}

export interface IPicture {
  date: string;
  hash: string;
  id: number;
  mimeType: string;
}

export interface IReview {
  comment: string;
  date: string;
  dish?: IDish;
  id: number;
  rating: number;
  restaurant?: IRestaurant;
  user?: IUser;
  pictures: IPicture[];
}
