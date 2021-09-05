import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { IProps } from './types/types';
import BaseButton from '../../../components/common/Buttons/BaseButton/BaseButton';
import { MaterialIcons } from 'react-native-vector-icons';
import { resetNavigation, UsePopToTopNavHook } from '../../../utils';
import { StyledWrapper } from '../../../styles/styled-components';
import i18n from 'i18n-js';

export const SuccessScreen: FunctionComponent<IProps> = (props) => {
  UsePopToTopNavHook(props.navigation);

  const handleNewDishNavigation = () =>
    resetNavigation(props.navigation, 1, 'Add Review');

  const handleProfileNavigation = () => {
    resetNavigation(props.navigation, 2, 'Profile');
  };

  return (
    <StyledWrapper>
      <View>
        <MaterialIcons name="check-circle" color={'green'} size={100} />
      </View>
      <BaseButton
        text={i18n.t('create_review__see_my_reviews')}
        callback={handleProfileNavigation}
        hasIcon={false}
      />
      <BaseButton
        text={i18n.t('create_review__create_another_review')}
        callback={handleNewDishNavigation}
        hasIcon={false}
      />
    </StyledWrapper>
  );
};
