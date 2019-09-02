import React from 'react';
import * as renderer from 'react-test-renderer';
import App from '../App.tsx';

describe('App', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.mock('TouchableOpacity', () => 'TouchableOpacity');
  });

  it('renders the ActivityIndicator component before font loads', async () => {
    const tree = await renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('ActivityIndicator');
    expect(tree.children).toBeNull();
  });
});
