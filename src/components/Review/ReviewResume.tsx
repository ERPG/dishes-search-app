import React, { FunctionComponent, useEffect } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import StarRating from 'react-native-star-rating';
import { IReview } from '../../../types/api';
import { StyledImageSmall } from '../../styles/styled-components/index'
import { EnvUris } from '../../utils/constants';

import Moment from 'moment';

export const ReviewResume: FunctionComponent<IReview> = props => {
  const { comment, date, rating, user, pictures } = props;

  useEffect(() => {
    Moment.locale('en');
  }, []);


  const avatarImage = () => {
    return (
      <Image
        style={styles.avatarImage}
        resizeMode="cover"
        source={{
          uri: `${EnvUris.PICTURE_EMPTY_URI}`,
        }}
      />
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.avatarWrapper}>
        {avatarImage()}
        <View style={styles.avatarText}>
          <Text>{user?.name}</Text>
          <Text style={styles.date}>{Moment(date).format('DD/MM/YYYY')}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <StarRating
          style={styles.rating}
          disabled={false}
          maxStars={5}
          starSize={20}
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
      {comment.length > 0 &&
        <View style={styles.container}>
          <Text>{comment}</Text>
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
    backgroundColor: '#ecf0f1',
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
  avatarImage: {
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  date: {
    fontSize: 12,
    color: 'grey',
  },
  container: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  rating: {
    paddingLeft: 0,
    paddingBottom: 10,
  },
  images: {
    height: 50,
    width: 50,
  },
  imagesWrapper: {
    height: 100,
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'space-around',
    paddingLeft: 5,
    paddingRight: 5
  },
  imageContainer: {
    aspectRatio:1,
    padding: 5
  },
});
