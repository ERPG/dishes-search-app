import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StyledMargenedWrapper } from '../../../styles/styled-components';
import HTML from 'react-native-render-html';
interface IResultItemProps {
  id: number;
  thumbnail?: string;
  name: string;
  itemSelected: (event: any) => void;
}

export const ResultItem: FunctionComponent<IResultItemProps> = (props) => {
  return (
    <StyledMargenedWrapper>
      <TouchableOpacity onPress={props.itemSelected}>
        <HTML style={styles.name} html={props.name}></HTML>
      </TouchableOpacity>
    </StyledMargenedWrapper>
  );
};

const styles = StyleSheet.create({
  name: {
    color: '#4D4D4D',
    fontSize: 13,
  },
});

export default ResultItem;
