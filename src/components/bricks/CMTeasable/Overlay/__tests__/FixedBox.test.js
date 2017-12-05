// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import FixedBox from '../FixedBox';

describe('FixedBox Component', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <FixedBox width={70} height="100%" bottom="10px">
          Content
        </FixedBox>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
