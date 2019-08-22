import React from 'react';
import * as Font from 'expo-font';
import {
  StyleSheet, View, StatusBar, ActivityIndicator,
} from 'react-native';
import { Grid, Col, Row } from 'native-base';
import Home from './src/screens/Home';
import Header from './src/components/Header';

interface IState {
  loading: boolean
}

export default class App extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <ActivityIndicator />;
    }
    return (
      <Grid style={styles.container}>
        <Col>
          <Row size={2}>
            <Header />
          </Row>
          <Row size={8}>
            <Home />
          </Row>
        </Col>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
});
