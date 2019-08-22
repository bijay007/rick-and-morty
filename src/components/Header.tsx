import React from 'react';
import {
  StyleSheet, Image,
} from 'react-native';
import { Grid, Col, Row } from 'native-base';
import SearchBar from './SearchBar';

const Header = () => (
  <Grid style={styles.wrapper}>
    <Col>
      <Row style={styles.image_row}>
        <Image
          style={styles.image}
          source={require('../../assets/logo.png')}
          resizeMode="contain"
        />
      </Row>
      <Row>
        <SearchBar />
      </Row>
    </Col>
  </Grid>
);

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    height: 150,
  },
  image_row: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    paddingVertical: 10,
    height: '90%',
  },
});
