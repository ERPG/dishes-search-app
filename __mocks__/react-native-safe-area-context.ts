const mock = jest.genMockFromModule('react-native-safe-area-context');

export const SafeAreaView = jest.fn(({children}) => children)