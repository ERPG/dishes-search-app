import { DEVICE_WIDTH, DEVICE_HEIGHT } from './../../utils/constants';
import { GRAY_DARK, CREME_MEDIUM, CREME_LIGHT } from './../colors';
import styled from 'styled-components/native';

interface labelProps {
  fixedStyle?: boolean;
}

// CONTAINERS
export const StyledWrapper = styled.View`
  flex-grow: 1;
  justify-content: center;
`;

export const StyledMargenedWrapper = styled.View`
  display: flex;
  margin: 16px;
  flex-grow: 1;
`;

export const StyledRow = styled.View`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

export const SpinnerWrapper = styled.View`
  flex-grow: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  position: relative;
  height: 100%;
`;

export const StyledTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const StyledHomeHeaderTitle = styled.Text`
  font-size: 32px;
  font-family: 'CircularStd-BoldItalic';
  width: 60%;
  padding-horizontal: 16px;
  padding-top: 140px;
  font-weight: bold;
  padding-bottom: 8px;
  color: ${GRAY_DARK};
`;

export const StyledHomeBackground = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  width: ${DEVICE_WIDTH}px;
  height: ${DEVICE_HEIGHT}px;
  background-color: ${CREME_MEDIUM};
`;

export const StyledHomeRoundShape = styled.View`
  position: absolute;
  height: 300px;
  width: 300px;
  background-color: ${CREME_LIGHT};
  right: 32px;
  top: 100px;
  border-radius: ${DEVICE_WIDTH}px;
`;

export const StyledShadowedWrapper = styled.View`
  flex: 1;
  align-items: stretch;
  padding: 0;
  margin-vertical: 8px;
  margin-horizontal: 12px;
  background-color: white;
  border-radius: 2px;
  shadow-color: black;
  shadow-radius: 2px;
  elevation: 5;
`;

export const StyledImageSmall = styled.Image`
  flex: 1;
  resize-mode: cover;
`;

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const StyledVerticalScrollView = styled.ScrollView`
  flex-direction: column;
`;

export const StyledEmptyListLabel = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  width: 100%;
  height: ${DEVICE_HEIGHT - 150}px;
`;

// LABELS
export const StyledLabel = styled.Text`
  margin-horizontal: 20px;
  padding: 5px;
  color: ${(props: labelProps) => (props.fixedStyle ? '#fff' : '#000')};
`;

export const StyledErrorLabel = styled.Text`
  padding: 0px 5px 5px 20px;
  color: red;
`;
