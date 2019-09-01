import React from 'react';
import * as renderer from 'react-test-renderer';
import App from '../App.tsx';

describe('App', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('renders the ActivityIndicator component before font loads', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('ActivityIndicator');
    expect(tree.children).toBeNull();
  });
});
