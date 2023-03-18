import React, {useEffect, useCallback} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {ImageConfig, NavigateTo} from '../constants';
import {localStorage} from '../helpers';

const StartupScreen = (props: any) => {
  const navigation = props.navigation;

  const chooseScreen = useCallback(async () => {
    const data: any = await localStorage.getItem('Propacity');
    console.log('data: ', data);

    if (data && typeof data === 'string') {
      const parsedData = JSON.parse(data);
      if (parsedData.screen === 'DashboardScreen') {
        navigation.replace(NavigateTo.DashboardScreen);
      } else if (parsedData.screen === 'AlbumScreen') {
        navigation.replace(NavigateTo.AlbumScreen, {
          id: parsedData.AlbumId,
          name: parsedData.name,
        });
      }
    } else {
      navigation.replace(NavigateTo.DashboardScreen);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      chooseScreen();
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={ImageConfig.SplashImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default StartupScreen;
