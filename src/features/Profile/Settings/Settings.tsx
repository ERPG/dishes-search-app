import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, YellowBox } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import i18n from 'i18n-js';
import { AuthContext } from '../../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as schemas from '../../../helpers/schemas';
import { ChangePassword } from '../../../api';
import BaseInput from '../../../components/common/Input/Input';
import BaseButton from '../../../components/common/Buttons/BaseButton/BaseButton';
import { InputType } from '../../../components/common/Input/types';

interface IApiResponse {
  message: string;
}

export const Settings = (props: any) => {
  const { userInfo } = useContext(AuthContext);
  const [editingPassword, setEditingPassword] = useState<Boolean>(false);
  const [successPassword, setSuccessPassword] = useState<Boolean>(false);
  const [apiError, setApiError] = useState<IApiResponse>({
    message: '',
  });

  const formik = useFormik({
    initialValues: {
      formikCurrentPassword: '',
      formikNewPassword: '',
    },
    onSubmit: (values, { setSubmitting, setErrors, setStatus, resetForm }) =>
      submit(values, { setSubmitting, setErrors, setStatus, resetForm }),
    validationSchema: schemas.Settings,
  });

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ]);

  const submit = async (
    values: any,
    { setSubmitting, setErrors, setStatus, resetForm }
  ): Promise<any> => {
    const { formikCurrentPassword, formikNewPassword } = values;
    try {
      const token = await SecureStore.getItemAsync('TOKEN');
      if (token) {
        await ChangePassword(
          formikCurrentPassword,
          formikNewPassword,
          userInfo.id,
          token
        );
        setSuccessPassword(true);
        setEditingPassword(false);
        resetForm({});
        return;
      }
      setApiError({ message: i18n.t('error__random_error') });
      return;
    } catch (e) {
      console.log(e);
      switch (true) {
        case e.message.indexOf('Forbidden') !== -1:
          setApiError({ message: i18n.t('error__password_incorrect') });
          break;
        default:
          setApiError({ message: i18n.t('error__random_error') });
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View testID="header" style={styles.titleWrapper}>
          <Icon
            testID="backspaceIcon"
            name="keyboard-backspace"
            color="black"
            size={50}
            onPress={() => props.navigation.goBack()}
          />
          <Text style={styles.title} testID="settingsTitle">
            {i18n.t('settings__title')}
          </Text>
        </View>
        <View testID="name">
          <Text style={styles.label}>{i18n.t('common__name')}</Text>
          <Text style={styles.textValue}>{userInfo.name}</Text>
        </View>
        <View testID="password">
          <Text style={styles.label}>{i18n.t('common__password')}</Text>
          {!editingPassword && (
            <Text
              style={styles.textButton}
              onPress={() => {
                setEditingPassword(true);
                setSuccessPassword(false);
              }}
            >
              Actualizar
            </Text>
          )}
          {editingPassword && (
            <View testID="editingPassword">
              <View style={styles.inputWrapper}>
                <BaseInput
                  testID={'settings-editing-password'}
                  inputType={InputType.PASSWORD}
                  placeholder={i18n.t('common__password__current')}
                  onChangeText={(txt) =>
                    formik.setFieldValue('formikCurrentPassword', txt)
                  }
                  onBlur={() => formik.setFieldTouched('formikCurrentPassword')}
                  value={formik.values.formikCurrentPassword}
                  autoCorrect={false}
                />
              </View>
              {formik.touched.formikCurrentPassword &&
                formik.errors.formikCurrentPassword && (
                  <Text style={styles.labelError}>
                    {formik.errors.formikCurrentPassword || ''}
                  </Text>
                )}
              <View style={styles.inputWrapper}>
                <BaseInput
                  testID={'settings-new-password'}
                  inputType={InputType.PASSWORD}
                  placeholder={i18n.t('common__password__new')}
                  onChangeText={(txt) =>
                    formik.setFieldValue('formikNewPassword', txt)
                  }
                  onBlur={() => formik.setFieldTouched('formikNewPassword')}
                  value={formik.values.formikNewPassword || ''}
                  autoCorrect={false}
                />
              </View>
              {formik.touched.formikNewPassword &&
                formik.errors.formikNewPassword && (
                  <Text style={styles.labelError}>
                    {formik.errors.formikNewPassword}
                  </Text>
                )}
              {apiError.message ? (
                <Text style={styles.labelError}>{apiError.message}</Text>
              ) : null}
              <BaseButton
                text={i18n.t('common__password__update')}
                callback={() => formik.handleSubmit()}
                disabled={!formik.isValid}
                hasIcon={false}
              />
            </View>
          )}
          {successPassword && (
            <Text style={styles.textValue}>
              {i18n.t('settings__password_success')}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  titleWrapper: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    flexDirection: 'column',
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    margin: 20,
  },
  labelError: {
    marginHorizontal: 20,
    padding: 10,
    color: 'red',
  },
  textValue: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  textButton: {
    position: 'absolute',
    right: 20,
    fontSize: 12,
    top: 30,
  },
  inputWrapper: {
    marginVertical: 10,
  },
});
