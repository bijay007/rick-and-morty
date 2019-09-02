import React from 'react';
import {
  StyleSheet, Image,
} from 'react-native';
import { Grid, Row } from 'native-base';
import SearchBar from './SearchBar';

const Header = () => (
  <Grid style={styles.wrapper}>
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
  </Grid>
);

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    height: 150,
  },
  image_row: {
    alignItems: 'center',
  },
  image: {
    flex: 1,
    paddingVertical: 10,
    height: '90%',
  },
});
