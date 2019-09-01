import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions, StyleSheet } from 'react-native';
import { Grid, Col, Row } from 'native-base';
import { AppProvider } from '../context/AppContext';
import Header from '../components/Header';
import CharacterList from '../components/CharacterList';

function Home() {
  const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));
  useEffect(() => {
    const onOrientationChange = data => {
      setScreenInfo(data.screen);
    };
    Dimensions.addEventListener('change', onOrientationChange);
    return () => Dimensions.removeEventListener('change', onOrientationChange);
  });
  const currentScreenInfo = {
    ...screenInfo,
    isLandscape: screenInfo.width > screenInfo.height,
  };

  return (
    <AppProvider>
      <Grid style={styles.container}>
        <Col>
          <Row size={currentScreenInfo.isLandscape ? 4 : 2}>
            <Header />
          </Row>
          <Row size={currentScreenInfo.isLandscape ? 6 : 8}>
            <CharacterList />
          </Row>
        </Col>
      </Grid>
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
