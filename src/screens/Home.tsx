import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Grid, Col, Row } from 'native-base';
import { AppProvider } from '../context/AppContext';
import Header from '../components/Header';
import Characters from '../components/Characters';

function Home() {
  return (
    <AppProvider>
      <Grid style={styles.container}>
        <Col>
          <Row size={2}>
            <Header />
          </Row>
          <Row size={8}>
            <Characters />
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
    paddingVertical: 5,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
});
