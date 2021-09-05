import React, { FunctionComponent, useContext, useState } from 'react';
import { View } from 'react-native';
import { ReviewContext } from '../ReviewContext';
import { IReviewContext, IProps } from './types/types';
import { searchSuggestions } from '../../../utils';
import { SearchRestaurant } from '../../../api';
import { IRestaurant } from '../../../../types/api';
import i18n from 'i18n-js';
import ResultList from '../../../components/common/List/ResultList';
import { Keyboard } from 'react-native';
import { MIN_SEARCH_CHARACTER_LENGTH } from '../../../utils/constants';
import BaseInput from '../../../components/common/Input/Input';
import { InputType } from '../../../components/common/Input/types';

export const RestaurantScreen: FunctionComponent<IProps> = ({ navigation }) => {
  const { reviewState, setReviewState } = useContext<IReviewContext>(
    ReviewContext
  );

  const [suggestions, updateSuggestions] = useState<IRestaurant[] | null>(null);

  const { restaurant } = reviewState;

  const handleOnChangeText = (e) => {
    searchSuggestions(e, SearchRestaurant, updateSuggestions);
    setReviewState({ ...reviewState, restaurant: { ...restaurant, name: e } });
  };

  const handleSelectSuggestion = (suggestion) => {
    setReviewState({ ...reviewState, restaurant: suggestion });
    navigation.navigate('ReviewScreen');
  };

  return (
    <View>
      <BaseInput
        inputType={InputType.SEARCH}
        testID="searchBar"
        value={restaurant.name}
        onSubmitEditing={() => Keyboard.dismiss()}
        placeholder={i18n.t('create_review__restaurant_placeholder')}
        onChangeText={handleOnChangeText}
      ></BaseInput>
      {restaurant.name.length > MIN_SEARCH_CHARACTER_LENGTH && (
        <ResultList
          items={suggestions}
          itemSelected={handleSelectSuggestion}
          originalSearchedString={restaurant.name}
        ></ResultList>
      )}
    </View>
  );
};
