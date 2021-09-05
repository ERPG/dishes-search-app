import React, { useState, FunctionComponent } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseInput from '../../components/common/Input/Input';
import { InputType } from '../../components/common/Input/types';
import { IDish } from '../../../types/api';
import {
  StyledRow,
  StyledHomeHeaderTitle,
  StyledHomeBackground,
  StyledHomeRoundShape,
} from '../../styles/styled-components';
import i18n from 'i18n-js';
import { Keyboard, Text, StyleSheet, View } from 'react-native';
import { searchSuggestions } from '../../utils';
import { SearchDish } from '../../api';
import { MaterialIcons } from 'react-native-vector-icons';
import { MIN_SEARCH_CHARACTER_LENGTH } from '../../utils/constants';
import ResultList from '../../components/common/List/ResultList';
import { RatingList } from '../Rating/RatingList/RatingList';

interface IProps {
  navigation?: StackNavigationProp<any, any>;
}

enum SearchState {
  initial = 'initial',
  searching = 'searching',
  showingResults = 'showingResults',
}

export const Search: FunctionComponent<IProps> = ({ navigation }) => {
  const [suggestions, updateSuggestions] = useState<IDish[] | null>(null);
  const [dish, setDish] = useState<IDish>({ name: '', id: 0 });
  const [searchState, setSearchState] = useState<string>(SearchState.initial);

  const handleOnChangeText = (e) => {
    searchSuggestions(e, SearchDish, updateSuggestions);
    setDish({ ...dish, name: e });
  };

  const resetView = () => {
    setSearchState(SearchState.initial);
    dish.name = '';
    Keyboard.dismiss();
  };

  const handleSelectSuggestion = (suggestion) => {
    const { name, id } = suggestion;
    setDish(suggestion);
    setSearchState(SearchState.showingResults);
    Keyboard.dismiss();
  };

  return (
    <View>
      {searchState === SearchState.initial && <StyledHomeBackground />}
      <SafeAreaView style={styles.container}>
        {searchState === SearchState.initial && (
          <StyledRow>
            <StyledHomeRoundShape />
            <StyledHomeHeaderTitle>
              {i18n.t('home__title')}
            </StyledHomeHeaderTitle>
          </StyledRow>
        )}
        <StyledRow>
          <BaseInput
            testID="searchBar"
            inputType={InputType.SEARCH}
            onSubmitEditing={() => Keyboard.dismiss()}
            value={dish.name}
            placeholder={i18n.t('search__placeholder')}
            onChangeText={handleOnChangeText}
            onFocus={() => setSearchState(SearchState.searching)}
            gotBackArrow={searchState === SearchState.showingResults}
            onLeftIconPressed={() => {
              if (searchState === SearchState.showingResults)
                setSearchState(SearchState.searching);
            }}
          ></BaseInput>
          {searchState !== SearchState.initial && (
            <MaterialIcons
              style={styles.quitIcon}
              name="clear"
              color={'grey'}
              size={28}
              onPress={() => resetView()}
            />
          )}
        </StyledRow>
        {searchState === SearchState.searching &&
          dish.name.length > MIN_SEARCH_CHARACTER_LENGTH && (
            <StyledRow>
              <ResultList
                items={suggestions}
                itemSelected={handleSelectSuggestion}
                originalSearchedString={dish.name}
              ></ResultList>
            </StyledRow>
          )}
        {searchState === SearchState.showingResults && (
          <RatingList
            dishId={dish.id}
            dishName={dish.name}
            navigation={navigation}
          ></RatingList>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  quitIcon: {
    padding: 16,
    paddingLeft: 0,
    paddingTop: 24,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
