import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log('working here...')
  return (
    <View style={styles.container}>
      <Text>Welcome to the adventures of Rick and Morty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
