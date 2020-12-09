// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ReloadCard from '../ReloadCard';

describe('ReloadCard Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<ReloadCard>Content</ReloadCard>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
