import React, { Component } from 'react';
import * as Font from 'expo-font';
import { ActivityIndicator } from 'react-native';
import Home from './src/screens/Home';

interface IState {
  loading: boolean
}

export default class App extends Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
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
    return <Home />;
  }
}
