import React, { useState, FunctionComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { GetUserDishReviews } from '../../api';
import { IReview } from '../../../types/api';
import { FlatList } from 'react-native-gesture-handler';
import { Review } from '../../components/Review/Review';
import { useFocusEffect } from '@react-navigation/native';
import { Spinner } from '../../components/common/Loader/Spinner';

interface IReviewList {
  userId: number;
}

export const UserReviewList: FunctionComponent<IReviewList> = (props) => {
  const [reviews, setReviews] = useState<IReview[] | null>(null);
  const { userId } = props;

  useFocusEffect(
    React.useCallback(() => {
      GetUserDishReviews(userId).then((result) => setReviews(result.data));
    }, [])
  );

  return (
    <View style={styles.wrapper}>
      {!reviews && <Spinner color="grey" size={60}></Spinner>}
      {reviews && (
        <FlatList
          keyExtractor={(item) => `${item.id}`}
          data={reviews}
          renderItem={({ item }) => {
            return (
              <Review
                id={item.id}
                dish={item.dish}
                restaurant={item.restaurant}
                comment={item.comment}
                date={item.date}
                rating={item.rating}
                pictures={item.pictures}
              />
            );
          }}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    marginBottom: '10%',
  },
});
