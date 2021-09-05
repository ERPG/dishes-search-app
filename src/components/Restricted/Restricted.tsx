import React, { FunctionComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import i18n from 'i18n-js';

export const Restricted: FunctionComponent<any> = (props) => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>{i18n.t('restricted__title')}</Text>

      <Text
        style={{ margin: 20, color: 'lightblue' }}
        onPress={() =>
          navigation.navigate('SignUp', {
            previousRoute: { name: 'Add Review', index: 1 },
          })
        }
      >
        {i18n.t('common__goto_signup')}
      </Text>
      <Text
        style={{ margin: 20, color: 'lightblue' }}
        onPress={() =>
          navigation.navigate('SignIn', {
            previousRoute: { name: 'Add Review', index: 1 },
          })
        }
      >
        {i18n.t('common__goto_signin')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 5,
    margin: 7,
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderColor: 'grey',
  },
  title: {
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
