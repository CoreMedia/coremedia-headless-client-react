// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Details from '../Details';

describe('Details Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Details>Content</Details>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
