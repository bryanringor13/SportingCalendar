import { StatusBar } from 'expo-status-bar';
import { Root } from "native-base";
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux';

import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_300Light_Italic, Roboto_500Medium, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppRoutes from './src/screens';
import { store } from './src/redux/store';

export default function App() {
  const [isReady, setIsReady] = useState(false)
  let [fontsLoaded] = useFonts({
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const _loadAssetsAsync = async () => {
    const fontAssets = Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'TradeGothic_bold': require('./assets/fonts/TradeGothic/trade-gothic-lt-bold.ttf'),
      'TradeGothic_italic': require('./assets/fonts/TradeGothic/trade-gothic-lt-condensed-no-18-oblique.ttf'),
      'TradeGothic_italic_bold': require('./assets/fonts/TradeGothic/trade-gothic-bold-oblique.otf'),
      'OpenSans_semibold': require('./assets/fonts/OpenSans/OpenSans-Semibold.ttf'),
      'OpenSans_regular': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
      ...Ionicons.font,
    })

    await Promise.all([fontAssets]);
    // await Promise.all([fontAssets, antoutline, antfill]);
  }

  useEffect(() => {
    console.log('Font',fontsLoaded)
  }, [fontsLoaded])

  if (!fontsLoaded || !isReady) {

    return <AppLoading startAsync={_loadAssetsAsync} onFinish={() => setIsReady(true)} onError={console.warn} />;

  } else {

    return (
      // Redux: Global Store
      <Provider store={store}>
        <Root>
          <AppRoutes />
          <StatusBar hidden />
        </Root>
      </Provider>
    );

  }
}