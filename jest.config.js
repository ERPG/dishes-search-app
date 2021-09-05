const expoPreset = require('jest-expo/jest-preset');
const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports =  {
  preset: 'jest-expo',
  setupFiles: [...expoPreset.setupFiles, ...jestPreset.setupFiles],
  moduleDirectories: [
    'node_modules',
    __dirname, 
  ],
  testPathIgnorePatterns: [
    "<rootDir>/e2e" 
  ],
  transform: {
    '\\.(ts|tsx)?$': 'babel-jest',
  }
};