import React, { useState, useEffect, FunctionComponent } from 'react';
import { View } from 'react-native';
import { GetDishReviews } from '../../api';
import { IReview } from '../../../types/api';
import { FlatList } from 'react-native-gesture-handler';
import { ReviewResume } from '../../components/Review/ReviewResume';
import { Spinner } from '../../components/common/Loader/Spinner';

interface IReviewList {
  dishId: number;
  restaurantId: number;
}

export const ReviewList: FunctionComponent<IReviewList> = (props) => {
  const [reviews, setReviews] = useState<IReview[] | null>(null);
  const { dishId, restaurantId } = props;

  useEffect(() => {
    GetDishReviews(dishId, restaurantId).then((result) =>
      setReviews(result.data)
    );
  }, []);

  return (
    <View>
      {!reviews && <Spinner color="grey" size={60}></Spinner>}
      {reviews && (
        <FlatList
          keyExtractor={(item) => `${item.id}`}
          data={reviews}
          renderItem={({ item }) => {
            return (
              <ReviewResume
                id={item.id}
                comment={item.comment}
                date={item.date}
                rating={item.rating}
                user={item.user}
                pictures={item.pictures}
              />
            );
          }}
        ></FlatList>
      )}
    </View>
  );
};
