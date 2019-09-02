import React, { useState, useEffect } from 'react';
import {
  StatusBar, Dimensions, StyleSheet, View,
} from 'react-native';
import { AppProvider } from '../context/AppContext';
import Header from '../components/Header';
import CharacterList from '../components/CharacterList';

function Home() {
  const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));
  useEffect(() => {
    const onOrientationChange = (data) => {
      setScreenInfo(data.screen);
    };
    Dimensions.addEventListener('change', onOrientationChange);
    return () => Dimensions.removeEventListener('change', onOrientationChange);
  });

  const isLandscape = screenInfo.width > screenInfo.height;
  const landscapeHeight = {
    height: screenInfo.height * 0.35,
  };
  const portraitHeight = {
    height: screenInfo.height * 0.2,
  };

  return (
    <AppProvider>
      <View style={styles.container}>
        <View style={isLandscape ? landscapeHeight : portraitHeight}>
          <Header />
        </View>
        <View style={{ flex: 1 }}>
          <CharacterList />
        </View>
      </View>
    </AppProvider>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Number(StatusBar.currentHeight + 5),
    backgroundColor: '#fff',
  },
});
