import React, { useContext, FunctionComponent } from 'react';
import { View, Text, StyleSheet, YellowBox } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from 'react-native-vector-icons';
import { UserReviewList } from '../../features/ReviewList/UserReviewList';
import i18n from 'i18n-js';
import { AuthContext } from '../../contexts/AuthContext';

export interface IProfile {
  navigation: any;
}

export const Profile: FunctionComponent<IProfile> = (props) => {
  const { navigation } = props;
  const { userInfo } = useContext(AuthContext);

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ]);

  return (
    <SafeAreaView>
      <Text style={styles.title}>{i18n.t('profile__title')}</Text>
      {userInfo && userInfo.id && (
        <MaterialIcons
          name="settings"
          color="black"
          size={30}
          style={styles.configurationIcon}
          onPress={() =>
            navigation.navigate('Settings', {
              previousRoute: { name: 'Profile', index: 2 },
            })
          }
        />
      )}
      {!userInfo && (
        <View style={styles.container}>
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
              color: 'blue',
            }}
            onPress={() =>
              navigation.navigate('SignUp', {
                previousRoute: { name: 'Profile', index: 2 },
              })
            }
          >
            {i18n.t('common__goto_signup')}
          </Text>
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
              color: 'blue',
            }}
            onPress={() =>
              navigation.navigate('SignIn', {
                previousRoute: { name: 'Profile', index: 2 },
              })
            }
          >
            {i18n.t('common__goto_signin')}
          </Text>
        </View>
      )}
      {userInfo && userInfo.id && (
        <View style={styles.container}>
          <Text
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
              color: 'black',
            }}
          >
            {userInfo.name}
          </Text>
          <Text
            testID="logout"
            style={{ marginVertical: 10, marginHorizontal: 20, color: 'red' }}
            onPress={async () => {
              await SecureStore.deleteItemAsync('TOKEN');
              navigation.navigate('SignIn', {
                previousRoute: { name: 'Profile', index: 2 },
              });
            }}
          >
            {i18n.t('common__logout')}
          </Text>
          <View style={styles.reviewListWrapper}>
            <UserReviewList userId={userInfo.id} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 30,
    marginHorizontal: 20,
    fontSize: 24,
  },
  container: {
    minHeight: '100%',
    flex: 1,
  },
  reviewListWrapper: {
    flex: 1,
  },
  configurationIcon: {
    position: 'absolute',
    right: 15,
    top: 30,
  },
});
