import React from 'react';
import {
  StyleSheet, View, Image, StatusBar,
} from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('./assets/logo.png')}
        resizeMode="contain"
      />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 100,
    padding: 10,
  },
});
