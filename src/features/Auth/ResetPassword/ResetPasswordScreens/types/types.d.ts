interface IRoute extends Route<'PasswordScreen'> {
  params: IRouteParams;
}

export interface IPasswordScreenProps {
  route?: IRoute;
  navigation?: StackNavigationProp<any, any>;
}
