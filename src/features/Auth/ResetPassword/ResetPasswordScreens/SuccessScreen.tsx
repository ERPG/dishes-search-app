import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import BaseButton from '../../../../components/common/Buttons/BaseButton/BaseButton';
import { MaterialIcons } from 'react-native-vector-icons';
import { UsePopToTopNavHook } from '../../../../utils';
import { StyledWrapper } from '../../../../styles/styled-components';
import i18n from 'i18n-js';
import { IProps } from '../../../Reviews/ReviewCreation/types/types';

const SuccessScreen: FunctionComponent<IProps> = ({ navigation }) => {
  UsePopToTopNavHook(navigation);

  const handleSignInNavigation = () => navigation?.navigate('SignIn');

  return (
    <StyledWrapper>
      <View>
        <MaterialIcons name="check-circle" color={'green'} size={100} />
      </View>
      <BaseButton
        text={i18n.t('Got to SignIn')}
        callback={handleSignInNavigation}
        hasIcon={false}
      />
    </StyledWrapper>
  );
};

export default SuccessScreen;
