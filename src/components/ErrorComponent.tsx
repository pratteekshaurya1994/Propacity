import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

const ErrorComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'red',
        }}>
        Something went wrong, please try again later!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ErrorComponent;
