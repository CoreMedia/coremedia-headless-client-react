// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { P } from '../Paragraph';

describe('P Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<P>Content</P>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
