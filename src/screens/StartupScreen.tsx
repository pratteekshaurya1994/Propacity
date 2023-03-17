import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {ImageConfig, NavigateTo} from '../constants';
// import {Colors, ImageConfig, NavigateTo} from '../constants';

const StartupScreen = (props: any) => {
  const navigation = props.navigation;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(NavigateTo.DashboardScreen);
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
