// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { TeaserBox } from '..';

describe('TeaserBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<TeaserBox>Content</TeaserBox>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
