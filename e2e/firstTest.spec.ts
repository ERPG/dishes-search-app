const { reloadApp } = require('detox-expo-helpers');

beforeAll(async () => {
  await reloadApp();
});

describe('App', () => {
  // For now we have hardcoded this, later on we will load each module when necessary
  const testSearchFeature = require('./features/Search')();
})