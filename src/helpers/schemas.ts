import * as Yup from 'yup';
import i18n from 'i18n-js';

export const name = () =>
  Yup.string()
    .min(2, i18n.t('error__too_short'))
    .max(50, i18n.t('error__too_long'))
    .required(i18n.t('error__required'));

export const emailSchema = () =>
  Yup.string()
    .email(i18n.t('error__email_not_valid'))
    .required(i18n.t('error__required'));

export const passwordSchema = () =>
  Yup.string()
    .min(2, i18n.t('error__too_short'))
    .max(50, i18n.t('error__too_long'))
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, {
      message: i18n.t('error__password_not_valid'),
      excludeEmptyString: true,
    })
    .required(i18n.t('error__required'));

export const ForgotPasswordSchema = () =>
  Yup.object().shape({
    passwordField: passwordSchema(),
    repeatPasswordField: Yup.string().test({
      name: 'match',
      test: function (v) {
        // Sin arrow function
        const ref = Yup.ref('passwordField');
        return v !== this.resolve(ref)
          ? this.createError({
              message: 'Passwords do not match',
              path: 'repeatPasswordField',
            })
          : true;
      },
    }),
  });

export const SignUp = () =>
  Yup.object().shape({
    name: name(),
    email: emailSchema(),
    password: passwordSchema(),
  });

export const SignIn = () =>
  Yup.object().shape({
    email: emailSchema(),
    password: passwordSchema(),
  });

export const Review = () =>
  Yup.object().shape({
    formikRating: Yup.string()
      .required(i18n.t('error__required'))
      .matches(/^[1-5]$/, {
        message: i18n.t('error__rating_is_empty'),
        excludeEmptyString: true,
      }),
  });

export const Settings = () =>
  Yup.object().shape({
    formikCurrentPassword: Yup.string().required(i18n.t('error__required')),
    formikNewPassword: Yup.string()
      .min(2, i18n.t('error__too_short'))
      .max(50, i18n.t('error__too_long'))
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, {
        message: i18n.t('error__password_not_valid'),
        excludeEmptyString: true,
      })
      .required(i18n.t('error__required')),
  });

export const boldString = (str, substr) => {
  var strRegExp = new RegExp(substr, 'g');
  return str.replace(strRegExp, `<strong>${substr}</strong>`);
};
