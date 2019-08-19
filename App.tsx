import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('./assets/logo.png')}
        resizeMode={'contain'}
      />
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
    maxHeight: 150,
    padding: 10,
  }
});
