import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from 'react';
import { View, Text } from 'react-native';
import { ReviewContext } from '../ReviewContext';
import BaseButton from '../../../components/common/Buttons/BaseButton/BaseButton';
import { IProps, IReviewContext } from './types/types';
import { searchSuggestions } from '../../../utils';
import { SearchDish } from '../../../api';
import { IDish } from '../../../../types/api';
import i18n from 'i18n-js';
import ResultList from '../../../components/common/List/ResultList';
import { MIN_SEARCH_CHARACTER_LENGTH } from '../../../utils/constants';
import BaseInput from '../../../components/common/Input/Input';
import { InputType } from '../../../components/common/Input/types';

export const DishScreen: FunctionComponent<IProps> = (props) => {
  const { reviewState, setReviewState } = useContext<IReviewContext>(
    ReviewContext
  );

  const { dish } = reviewState;

  const [suggestions, updateSuggestions] = useState<IDish[] | null>(null);

  const [isNewDish, setIsNewDish] = useState<boolean>(false);

  const disabled = !isNewDish;

  const dishAndSuggestionHandler = (value: string): void => {
    const suggestionsAvailable = suggestions && suggestions.length > 0;
    const valueEqualSuggestion = (elem) => {
      elem.name === value ? setIsNewDish(false) : setIsNewDish(true);
    };
    if (suggestionsAvailable) {
      suggestions.forEach(valueEqualSuggestion);
      return;
    }
    setIsNewDish(true);
    return;
  };

  const dishNameStateHandler = (e: string) => {
    setReviewState({
      ...reviewState,
      dish: { ...dish, name: e },
    });
  };

  const handleEmtyInputValue = (): void => {
    const emptyValue = dish.name.length === 0;
    if (emptyValue) {
      setIsNewDish(false);
    }
  };

  const handleOnChangeText = (e: string): void => {
    searchSuggestions(e, SearchDish, updateSuggestions);
    dishNameStateHandler(e);
    dishAndSuggestionHandler(e);
  };

  const handleSelectSuggestion = (suggestion: IDish): void => {
    setReviewState({
      ...reviewState,
      dish: suggestion,
    });
    props.navigation.navigate('RestaurantScreen');
  };

  const handleNewDish = (): void => {
    const { name } = dish;
    setReviewState({
      ...reviewState,
      dish: { ...dish, name: name.trim() },
    });
    props.navigation.navigate('RestaurantScreen');
  };

  useEffect(() => {
    handleEmtyInputValue();
  }, [dish.name]);

  return (
    <View>
      <BaseInput
        inputType={InputType.SEARCH}
        testID="searchBar"
        value={dish.name}
        placeholder={i18n.t('create_review__dish_placeholder')}
        onChangeText={handleOnChangeText}
      ></BaseInput>
      {dish.name.length > MIN_SEARCH_CHARACTER_LENGTH && (
        <ResultList
          items={suggestions}
          itemSelected={handleSelectSuggestion}
          originalSearchedString={dish.name}
        ></ResultList>
      )}
      {isNewDish && (
        <Text style={{ textAlign: 'center', marginTop: 50 }}>
          {i18n.t('create_review__is_new_dish')}
        </Text>
      )}
      <BaseButton
        text={'Continue'}
        callback={handleNewDish}
        hasIcon={false}
        disabled={disabled}
      />
    </View>
  );
};
