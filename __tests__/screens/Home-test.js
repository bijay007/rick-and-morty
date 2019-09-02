import React from 'react';
import * as renderer from 'react-test-renderer';
import Home from '../../src/screens/Home';

describe('Home', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  it('renders correctly', async () => {
    const tree = await renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('contains two inner <Row> children elements', async () => {
    const tree = await renderer.create(<Home />).toJSON();
    expect(tree.children[0].children.length).toBe(1);
  });
});
