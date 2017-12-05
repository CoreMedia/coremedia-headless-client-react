// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Button } from '../Button';

describe('Button Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Button>Content</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
