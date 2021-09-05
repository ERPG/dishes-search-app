import React, { FunctionComponent } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { IDishCardProps } from './types/types';
import { EnvUris } from '../../utils/constants';
import { StyledShadowedWrapper } from '../../styles/styled-components';

export const DishCard: FunctionComponent<IDishCardProps> = props => {
  
  const dishImage = (uri: string) => {
    return (
      <Image
        style={styles.mainImage}
        resizeMode="cover"
        source={{
          uri,
        }}
      />
    );
  };

  const {
    restaurantName,
    restaurantAddress,
    restaurantLat,
    restaurantLng,
    dishId,
    restaurantId,
    id,
    rating,
    reviewsCount,
    pictures
  } = props.item;
  const { dishName } = props;

  let pictureUri = `${EnvUris.PICTURE_EMPTY_URI}`;
  if (pictures.length) {
    pictureUri = `${EnvUris.PICTURE_THUMBNAIL_BASE_URI}/${pictures[0].hash}`;
  }

  return (
    <StyledShadowedWrapper>
      <TouchableWithoutFeedback
        onPress={() =>
          props.navigation?.navigate('Summary', {
            restaurantName,
            restaurantAddress,
            restaurantLat,
            restaurantLng,
            id,
            rating,
            reviewsCount,
            dishName,
            dishId,
            restaurantId,
            pictures
          })
        }
      >

        {pictureUri && dishImage(pictureUri)}

        <View style={styles.contentWrapper}>

          <View style={styles.ratingWrapper}>
            <Text style={styles.ratingNumber}>{rating}</Text>
            <StarRating
              style={styles.ratingStars}
              disabled={false}
              maxStars={5}
              starSize={24}
              rating={rating}
              selectedStar={rating => {}}
              fullStarColor={'yellow'}
            />
            <Text style={styles.ratingCount}>{`(${reviewsCount})`}</Text>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.title}>{restaurantName}</Text>
          </View>

          <View style={styles.textWrapper}>
            <Text style={styles.subtitle}>{restaurantAddress}</Text>
          </View>

        </View>

      </TouchableWithoutFeedback>
    </StyledShadowedWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    color: '#34495e',
  },
  contentWrapper: {
    padding: 16
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
  },
  textWrapper: {
    padding: 4
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 4
  },
  ratingStars: {
    fontSize: 5,
    padding: 4
  },
  ratingCount: {
    fontSize: 16,
    padding: 4
  },
  mainImage: {
    width: '100%',
    height: 175,
    resizeMode: 'cover',
  },
});
