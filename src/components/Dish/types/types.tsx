import { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '@react-navigation/native';

import { IRating, IPicture } from '../../../../types/api';

interface IRouteSummaryParams extends IRating {
  dishName: string;
  dishId: number;
  restaurantId: number;
}

export interface IRouteSummary extends Route<'Summary'> {
  params: IRouteSummaryParams;
}

export interface IDishCardProps {
  item: IRating;
  dishName: string;
  navigation?: StackNavigationProp<any, any>;
  pictures: IPicture[];
}
