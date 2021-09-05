import React, { FunctionComponent, useCallback, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { StackNavigationProp } from '@react-navigation/stack';
import StarRating from 'react-native-star-rating';

import { IRouteSummary } from './types/types';
import { ReviewList } from '../../features/ReviewList/ReviewList';
import { DEVICE_HEIGHT, EnvUris } from '../../utils/constants';

import { StyledImageSmall } from '../../styles/styled-components/index';
import FixedButton from '../common/Buttons/FixedButton/FixedButton';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalStore } from '../../contexts/GlobalContext/GlobalContext';

import * as SecureStore from 'expo-secure-store';
import { updateRouteState } from '../../contexts/GlobalContext/actions/routeState';
import { updateSearchState } from '../../contexts/GlobalContext/actions/searchState';
export interface IDishSummary {
  route: IRouteSummary;
  navigation: StackNavigationProp<any, any>;
}

export const DishSummary: FunctionComponent<IDishSummary> = ({
  navigation,
  route,
}) => {
  const {
    dishId,
    dishName,
    restaurantName,
    restaurantAddress,
    restaurantLat,
    restaurantLng,
    rating,
    reviewsCount,
    restaurantId,
    pictures,
  } = route?.params;

  const { state, dispatch } = useContext(GlobalStore);

  const currentRoute = {
    stack: 'SearchStack',
    screen: 'Summary',
    index: 1,
    resetState: false,
  };

  useFocusEffect(
    useCallback(() => {
      const previousRouteAvailable =
        state.routeState && state.routeState.previousRoute;
      if (previousRouteAvailable) {
        const fromSignIn = state.routeState.previousRoute.screen === 'SignIn';
        const searchDataAvailable =
          state.searchState &&
          state.searchState.dish &&
          state.searchState.restaurant;
        if (fromSignIn && searchDataAvailable) {
          dispatch(updateRouteState({ previousRoute: currentRoute }));
          navigation.navigate('Add Review', {
            screen: 'ReviewScreen',
          });
        }
      }
    }, [navigation, state])
  );

  const restaurantLatLng: LatLng = {
    latitude: restaurantLat,
    longitude: restaurantLng,
  };

  const goToNewReviewHandler = useCallback(async () => {
    const token = await SecureStore.getItemAsync('TOKEN');
    dispatch(updateRouteState({ previousRoute: currentRoute }));
    dispatch(
      updateSearchState({
        dish: { name: dishName, id: dishId },
        restaurant: {
          id: restaurantId,
          name: restaurantName,
          address: restaurantAddress,
        },
      })
    );
    if (token) {
      navigation.navigate('Add Review', {
        screen: 'ReviewScreen',
      });
    } else {
      navigation.navigate('SignIn');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View testID="header" style={styles.titleWrapper}>
        <Icon
          testID="backspaceIcon"
          name="keyboard-backspace"
          color="#f50"
          size={50}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.title}>
          <Text testID="dishName">{dishName}</Text>
          <Text testID="restaurantName">{restaurantName}</Text>
        </View>
      </View>

      <View style={styles.ratingWrapper}>
        <StarRating
          testID="rating"
          style={styles.rating}
          disabled={false}
          maxStars={5}
          rating={rating}
          selectedStar={(rating) => {}}
          fullStarColor={'yellow'}
        />
        <Text testID="ratingDesc" numberOfLines={1}>
          ({rating}/5)
        </Text>
      </View>

      <Text testID="reviewCount">{`Review count (${reviewsCount})`}</Text>

      {pictures && (
        <View style={styles.imagesWrapper}>
          <FlatList
            data={pictures}
            horizontal={true}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <StyledImageSmall
                  testID={`image${item.id}`}
                  source={{
                    uri: `${EnvUris.PICTURE_THUMBNAIL_BASE_URI}/${item.hash}`,
                  }}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}

      <View style={styles.reviewListWrapper}>
        <ReviewList dishId={dishId} restaurantId={restaurantId} />
      </View>

      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: restaurantLat,
            longitude: restaurantLng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={restaurantLatLng}
            title={restaurantName}
            description={restaurantAddress}
          />
        </MapView>
      </View>
      <View style={{ alignItems: 'center' }}>
        <FixedButton
          text={'Escribir una opinión'}
          callback={goToNewReviewHandler}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignContent: 'space-between',
    height: DEVICE_HEIGHT,
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  title: {
    flexDirection: 'column',
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagesWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'space-around',
    paddingLeft: 5,
    paddingRight: 5,
  },
  imageContainer: {
    aspectRatio: 1,
    padding: 5,
  },
  rating: {
    fontSize: 5,
  },
  reviewListWrapper: {
    flex: 3,
  },
  mapWrapper: {
    paddingTop: 20,
    flex: 2,
    alignItems: 'stretch',
  },
  map: {
    width: '100%',
    flex: 1,
  },
});
