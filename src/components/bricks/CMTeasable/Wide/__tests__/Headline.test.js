// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Headline from '../Headline';

describe('Headline Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Headline>Content</Headline>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
