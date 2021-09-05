import React, { FunctionComponent, useEffect } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import StarRating from 'react-native-star-rating';
import { IReview } from '../../../types/api';
import Moment from 'moment';
import { EnvUris } from '../../utils/constants';
import { StyledShadowedWrapper } from '../../styles/styled-components';
import { StyledImageSmall } from '../../styles/styled-components/index'

export const Review: FunctionComponent<IReview> = props => {
  const { dish, comment, date, rating, restaurant, pictures} = props;

  useEffect(() => {
    Moment.locale('en');
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>
          {dish.name}
        </Text>
        <Text style={styles.subtitle}>
          {restaurant.name}
        </Text>
        <Text style={styles.date}>{Moment(date).format('DD/MM/YYYY')}</Text>
      </View>
      {comment.length > 0 &&
        <View style={styles.contentWrapper}>
          <Text>{comment}</Text>
        </View>
      }
      <View style={styles.ratingWrapper}>
        <StarRating
          style={styles.rating}
          disabled={false}
          maxStars={5}
          starSize={30}
          rating={rating}
          selectedStar={rating => {}}
          fullStarColor={'yellow'}
        />
      </View>
      {pictures && pictures.length > 0 &&
        <View style={styles.imagesWrapper}>
          <FlatList
            data={pictures}
            horizontal={true}
            renderItem={({ item }) => <View style={styles.imageContainer}>
              <StyledImageSmall
                testID={`image${item.id}`}
                source={{
                  uri: `${EnvUris.PICTURE_THUMBNAIL_BASE_URI}/${item.hash}`,
                }}
              />
              </View>}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
    margin: 7,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
  },
  avatarWrapper: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  avatarText: {
    paddingLeft: 10,
  },
  mainImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28
  },
  subtitle: {
    fontSize: 22
  },
  date: {
    fontSize: 12,
    color: 'grey',
  },
  contentWrapper: {
    padding: 16,
  },
  ratingWrapper: {
    padding: 16,
    width: '60%'
  },
  rating: {
    width: '100px',
  },
  imagesWrapper: {
    height: 150,
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'space-around',
    padding: 16,
  },
  imageContainer: {
    aspectRatio:1,
    padding: 5
  },
});
