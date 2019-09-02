import React from 'react';
import * as renderer from 'react-test-renderer';
import Pagination from '../../src/components/Pagination';

const fakeProps = {
  totalPages: 0,
  currentPage: 0,
  character: '',
  onPress: () => {},
};

describe('Pagination', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  it('renders correctly', async () => {
    const props = fakeProps;
    const tree = await renderer.create(<Pagination props={props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should be passed props object with 4 properties', async () => {
    const tree = await renderer.create(<Pagination />).toTree();
    const { propTypes } = tree.type;
    const fakePropsKeys = Object.keys(fakeProps).sort();
    const propTypesKeys = Object.keys(propTypes).sort();
    expect(propTypesKeys).toEqual(fakePropsKeys);
  });
  it('should return single <ScrollView> component', async () => {
    const tree = await renderer.create(<Pagination />).toJSON();
    expect(tree.children.length).toBe(1);
    expect(tree.type).toBe('RCTScrollView');
  });
});
