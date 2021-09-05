import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ResultItem } from './ResultItem';
import { Spinner } from '../Loader/Spinner';
import i18n from 'i18n-js';
import { StyledErrorLabel } from '../../../styles/styled-components';
import { boldString } from '../../../helpers/schemas';
import { StyledMargenedWrapper } from '../../../styles/styled-components';
interface IResultListProps {
  title?: string;
  originalSearchedString?: string;
  items: IResultItem[] | null;
  itemSelected: (event: any) => void;
}

interface IResultItem {
  id: number;
  thumbnail?: string;
  name: string;
}

export const ResultList: FunctionComponent<IResultListProps> = (props) => {
  return (
    <View>
      {!props.items && <Spinner color="grey" size={60}></Spinner>}
      {props.items && props.items.length == 0 && (
        <StyledErrorLabel>{i18n.t('error__no_results')}</StyledErrorLabel>
      )}
      {props.items && props.items.length != 0 && (
        <View>
          {props.title && (
            <StyledMargenedWrapper>
              <Text>{props.title}</Text>
            </StyledMargenedWrapper>
          )}
          <FlatList
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => `${item.id}`}
            data={props.items}
            renderItem={({ item }) => {
              return (
                <ResultItem
                  id={item.id}
                  name={
                    props.originalSearchedString
                      ? boldString(item.name, props.originalSearchedString)
                      : item.name
                  }
                  thumbnail={item.thumbnail}
                  itemSelected={({ i }) => {
                    props.itemSelected(item);
                  }}
                />
              );
            }}
          ></FlatList>
        </View>
      )}
    </View>
  );
};

export default ResultList;
