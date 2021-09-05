import React, { useState, useEffect, FunctionComponent } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from 'react-native-vector-icons';
import i18n from 'i18n-js';
import { IRating } from '../../../../types/api';
import { GetDishRatings } from '../../../api';
import { DishCard } from '../../../components/Dish/DishCard';
import { StyledEmptyListLabel } from '../../../styles/styled-components';
import { Spinner } from '../../../components/common/Loader/Spinner';
import { DEVICE_HEIGHT } from '../../../utils/constants';

interface IRatingListProps {
  dishId: number;
  dishName: string;
  navigation?: StackNavigationProp<any, any>;
}

export const RatingList: FunctionComponent<IRatingListProps> = (props) => {
  const [dishes, setDishes] = useState<IRating[] | null>(null);

  useEffect(() => {
    GetDishRatings(props.dishId).then((result) => setDishes(result.data));
  }, []);

  const _listEmptyComponent = () => {
    return (
      <StyledEmptyListLabel>
        <MaterialIcons name="search" size={60} />
        <Text>{i18n.t('error__no_results')}</Text>
      </StyledEmptyListLabel>
    );
  };

  return (
    <View style={styles.container}>
      {!dishes && <Spinner color="grey" size={60}></Spinner>}
      {dishes && (
        <FlatList
          keyExtractor={(item) => item.restaurantId.toString()}
          data={dishes}
          ListEmptyComponent={_listEmptyComponent}
          renderItem={({ item }) => {
            return (
              <DishCard
                navigation={props.navigation}
                dishName={props.dishName}
                item={item}
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
  container: {
    height: DEVICE_HEIGHT,
    paddingBottom: 120,
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    flexDirection: 'column',
    marginVertical: 10,
  },
});
