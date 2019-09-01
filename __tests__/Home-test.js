import React from 'react';
import * as renderer from 'react-test-renderer';
import Home from '../src/screens/Home';

describe('Home', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
