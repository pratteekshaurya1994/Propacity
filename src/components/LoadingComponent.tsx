import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

const LoadingComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color={'red'} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingComponent;
