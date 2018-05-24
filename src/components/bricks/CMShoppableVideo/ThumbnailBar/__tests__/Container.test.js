// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Container from '../Container';

describe('Container Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Container translateX={10}>Content</Container>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
