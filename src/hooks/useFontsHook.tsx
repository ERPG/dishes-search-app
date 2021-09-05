import { AppLoading } from 'expo';
import { useFonts } from '@expo-google-fonts/inter';
import * as Font from 'expo-font';

const useFontsHook = () => {
  const customFonts = {
    'CircularStd-Black': require('../../assets/fonts/CircularStd-Black.otf'),
    'CircularStd-BlackItalic': require('../../assets/fonts/CircularStd-BlackItalic.otf'),
    'CircularStd-Bold': require('../../assets/fonts/CircularStd-Bold.otf'),
    'CircularStd-BoldItalic': require('../../assets/fonts/CircularStd-BoldItalic.otf'),
    'CircularStd-Book': require('../../assets/fonts/CircularStd-Book.otf'),
    'CircularStd-BookItalic': require('../../assets/fonts/CircularStd-BookItalic.otf'),
    'CircularStd-Light': require('../../assets/fonts/CircularStd-Light.otf'),
    'CircularStd-LightItalic': require('../../assets/fonts/CircularStd-LightItalic.otf'),
    'CircularStd-Medium': require('../../assets/fonts/CircularStd-Medium.otf'),
    'CircularStd-MediumItalic': require('../../assets/fonts/CircularStd-MediumItalic.otf'),
  };

  let [fontsLoaded] = useFonts(customFonts);

  const loadFontsAsync = async (): Promise<void> => {
    await Font.loadAsync(customFonts);
  };

  if (!fontsLoaded) {
    loadFontsAsync();
  }

  return { fontsLoaded, AppLoading };
};

export default useFontsHook;
