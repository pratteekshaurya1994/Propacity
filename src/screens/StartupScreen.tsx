import React, {useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {NavigateTo} from '../constants';
// import {Colors, ImageConfig, NavigateTo} from '../constants';

const StartupScreen = (props: any) => {
  const navigation = props.navigation;

  useEffect(() => {
    setTimeout(() => {
      console.log('Hello');
      navigation.navigate(NavigateTo.DashboardScreen);
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'red',
        }}>
        hello
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
