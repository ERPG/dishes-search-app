export const linking = {
  prefixes: [],
  config: {
    SignIn: {
      path: 'sign-in',
    },
    SignUp: {
      path: 'sign-up',
    },
    TabNavigator: {
      path: '',
      screens: {
        Search: {
          path: 'search',
          screens: {
            Search: { path: 'search' },
            Ratings: { path: 'rating' },
            Summary: { path: 'summary' },
          },
        },
        AddReview: {
          path: 'add-review',
          screens: {
            RestaurantScreen: { path: 'add-restaurant' },
            DishScreen: { path: 'add-dish' },
            ReviewScreen: { path: 'add-review' },
            SuccessScreen: { path: 'success' },
            Restricted: { path: 'restricted' },
          },
        },
        Profile: { path: 'profile' },
      },
    },
    ResetPasswordStack: {
      path: 'reset-password',
      screens: {
        EmailScreen: { path: 'email-screen' },
        PasswordScreen: {
          path: 'pasword-screen/:hash',
          parse: { hash: String },
        },
      },
    },
  },
};
