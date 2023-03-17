import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const App = () => {
  const [name, setName] = useState<String>('name');
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Text
        style={{
          color: 'red',
        }}>
        {name}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
