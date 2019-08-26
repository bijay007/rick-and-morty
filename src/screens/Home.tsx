import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Grid, Col, Row } from 'native-base';
import Header from '../components/Header';
import Characters from '../components/Characters';

function Home() {
  return (
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
