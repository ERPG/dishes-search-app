import React, {
  useState,
  FunctionComponent,
  useContext,
  useCallback,
} from 'react';
import { View, StyleSheet, Text, Keyboard, FlatList } from 'react-native';
import { ReviewContext } from '../ReviewContext';
import StarRating from 'react-native-star-rating';
import { IReviewContext, IImageFromGallery, IProps } from './types/types';
import { TextInput } from 'react-native-gesture-handler';
import ImageErasableSquared from '../../../components/common/Image/ImageErasableSquared';
import { DEVICE_WIDTH } from '../../../utils/constants';
import { CreateReview, UploadReviewPicture, CreateDish } from '../../../api';
import BaseButton from '../../../components/common/Buttons/BaseButton/BaseButton';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { IReview, IDish } from '../../../../types/api';
import { StyledVerticalScrollView } from '../../../styles/styled-components';
import { Spinner } from '../../../components/common/Loader/Spinner';
import i18n from 'i18n-js';
import { useFormik } from 'formik';
import * as schemas from '../../../helpers/schemas';
import { GlobalStore } from '../../../contexts/GlobalContext/GlobalContext';
import { useFocusEffect } from '@react-navigation/native';
import { updateSearchState } from '../../../contexts/GlobalContext/actions/searchState';
import { updateRouteState } from '../../../contexts/GlobalContext/actions/routeState';
import { StyledMargenedContainer } from '../../../styles/styled-components/containers';

interface IApiResponse {
  message: string;
}
// File estructure for Redux and context application
// Restrict route for users not logged in and redirect to profile.
// Create a review, set review Context to initial state and remove history from route.
export const ReviewScreen: FunctionComponent<IProps> = ({ navigation }) => {
  const { reviewState, setReviewState } = useContext<IReviewContext>(
    ReviewContext
  );
  const [apiError, setApiError] = useState<IApiResponse>({
    message: '',
  });
  const [images, setImages] = useState<IImageFromGallery[]>([]);
  const [isSaving, setIsSaving] = useState<Boolean>(false);
  const { rating, comment, restaurant, dish } = reviewState;

  const { state, dispatch } = useContext(GlobalStore);

  useFocusEffect(
    useCallback(() => {
      const previousRouteAvailable =
        state.routeState && state.routeState.previousRoute;
      if (previousRouteAvailable) {
        const fromSummary = state.routeState.previousRoute.screen === 'Summary';
        const reviewDataAvailable =
          state.searchState &&
          state.searchState.dish &&
          state.searchState.restaurant;
        if (fromSummary && reviewDataAvailable) {
          const { restaurant, dish } = state.searchState;
          setReviewState({
            ...reviewState,
            dish,
            restaurant,
          });
        }
      }
    }, [navigation, state])
  );

  const formik = useFormik({
    initialValues: {
      formikComment: comment,
      formikRating: rating,
    },
    onSubmit: (values, { setSubmitting }) => submit(values, setSubmitting),
    validationSchema: schemas.Review,
  });

  const submit = async (
    values: any,
    setSubmitting: (boolean) => void
  ): Promise<any> => {
    const { formikRating, formikComment } = values;
    try {
      setIsSaving(true);
      let { restaurant, dish } = reviewState;
      const token = await SecureStore.getItemAsync('TOKEN');
      if (token) {
        // new Dish substitution
        const newDish = await newDishHandler(dish, token);
        dish = newDish ? newDish : dish;
        // send review form data
        const createdReview = await CreateReview(
          dish.id,
          restaurant.id,
          formikRating,
          formikComment,
          token
        );

        // send images
        await uploadPictures(createdReview, token);
        setSubmitting(false);
        setApiError({ message: '' });
        cleanStates();

        // Clean global store
        dispatch(updateRouteState(null));
        dispatch(updateSearchState(null));

        navigation?.navigate('SuccessScreen');
        return;
      }
      setIsSaving(false);
      setApiError({ message: i18n.t('error__random_error') });
      setSubmitting(false);
    } catch (e) {
      console.log(e);
      setIsSaving(false);
      setSubmitting(false);
      switch (true) {
        case e.message.indexOf('uk_review_dish_restaurant_user') !== -1 &&
          e.status.indexOf('CONFLICT') !== -1:
          setApiError({ message: i18n.t('error__review_repeated') });
          break;
        default:
          setApiError({ message: i18n.t('error__random_error') });
      }
    }
  };

  const cleanStates = (): void => {
    setReviewState({
      restaurant: { id: 0, name: '', address: '' },
      dish: { id: 0, name: '' },
      rating: 0,
      comment: '',
    });
  };

  const _handleKeyPress = (e): void => {
    let keyPressed: string = e.nativeEvent.key;
    if (keyPressed === 'Enter') {
      Keyboard.dismiss();
    }
  };

  const newDishHandler = async (dish: IDish, token: string): Promise<any> => {
    let newDish;
    const isANewDish = dish.id === 0;
    if (isANewDish) {
      try {
        newDish = await CreateDish(dish.name, token);
        setReviewState({ ...reviewState, dish: newDish });
      } catch (e) {
        console.log(e);
        setApiError({ message: i18n.t('error__random_error') });
      }
      return newDish;
    }
    return newDish;
  };

  const uploadPictures = async (
    createdReview: IReview,
    token: string
  ): Promise<any> => {
    for (const image of images) {
      try {
        let resizedImage = await ImageManipulator.manipulateAsync(
          image.source,
          [{ resize: { height: 1080 } }],
          { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
        );
        if (resizedImage.width > 1920) {
          resizedImage = await ImageManipulator.manipulateAsync(
            image.source,
            [{ resize: { width: 1920 } }],
            { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG }
          );
        }
        const fetchedImage = await fetch(resizedImage.uri);
        const imageBlob = await fetchedImage.blob();
        await UploadReviewPicture(createdReview.id, imageBlob, token);
      } catch (e) {
        console.log(e);
        setApiError({ message: i18n.t('error__random_error') });
      }
    }
  };

  const openMediaGallery = async () => {
    try {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access Image Gallery is required!');
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.cancelled === true) {
        return;
      }

      const imageSource = pickerResult.uri;

      if (images.find((e) => e.source === imageSource)) {
        return;
      }

      setImages([{ source: imageSource }].concat(images));
    } catch (error) {
      console.log('Error in open media Gallery:', error);
    }
  };

  const deleteImage = (source) => {
    setImages(images.filter((img) => source != img.source));
  };

  const setRating = (rating) => {
    formik.setFieldTouched('formikRating');
    formik.setFieldValue('formikRating', rating);
    setReviewState({ ...reviewState, rating: rating });
  };

  const setComment = (text) => {
    formik.setFieldValue('formikComment', text);
    setReviewState({ ...reviewState, comment: text });
  };

  return (
    <StyledVerticalScrollView>
      <View style={styles.container}>
        <Text style={styles.dishText}>{dish.name}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.restaurantText}>{`${restaurant.name}`}</Text>
      </View>
      <View style={styles.container}>
        <StarRating
          style={styles.rating}
          disabled={false}
          maxStars={5}
          rating={formik.values.formikRating}
          selectedStar={(rating: number) => setRating(rating)}
          fullStarColor={'#ffcf3b'}
        />
      </View>
      {formik.errors.formikRating && (
        <Text style={styles.labelError}>{formik.errors.formikRating}</Text>
      )}
      <View style={styles.textareaContainer}>
        <TextInput
          style={styles.textarea}
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setComment(text)}
          onBlur={() => formik.setFieldTouched('formikComment')}
          value={formik.values.formikComment}
          onKeyPress={_handleKeyPress}
          placeholder={i18n.t('create_review__comment_placeholder')}
          blurOnSubmit={true}
        />
      </View>

      {images.length > 0 && (
        <View style={styles.imagesContainer}>
          <FlatList
            horizontal={true}
            keyExtractor={(item) => `${item.source}`}
            data={images}
            renderItem={({ item }) => {
              return (
                <ImageErasableSquared
                  source={item.source}
                  deleteImage={({ i }) => {
                    deleteImage(item.source);
                  }}
                />
              );
            }}
          ></FlatList>
        </View>
      )}
      <StyledMargenedContainer>
        <BaseButton
          text={i18n.t('create_review__image')}
          callback={() => openMediaGallery()}
          hasIcon={true}
          iconName={'add'}
          iconColor={'#000'}
          iconSize={28}
        />
        <BaseButton
          text={i18n.t('create_review__submit')}
          callback={() => formik.handleSubmit()}
          disabled={!formik.isValid}
          hasIcon={false}
        />
      </StyledMargenedContainer>

      {apiError.message ? (
        <Text style={styles.labelError}>{apiError.message}</Text>
      ) : null}

      {isSaving === true && (
        <View style={styles.spinnerWrapper}>
          <Spinner size={60} color="grey"></Spinner>
        </View>
      )}
    </StyledVerticalScrollView>
  );
};

const styles = StyleSheet.create({
  scrollWrapper: {
    flexDirection: 'column',
  },
  spinnerWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  spinner: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 5,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  imagesContainer: {
    marginTop: 30,
    padding: 5,
    marginHorizontal: 20,
    height: 140,
    justifyContent: 'center',
  },
  textareaContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    width: DEVICE_WIDTH - 40,
    marginHorizontal: 20,
  },
  textarea: {
    height: 150,
  },
  labelError: {
    marginHorizontal: 20,
    padding: 10,
    color: 'red',
  },
  restaurantText: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#34495e',
  },
  dishText: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  rating: {
    // Check how to change size
    fontSize: 5,
    padding: 20,
  },
});
