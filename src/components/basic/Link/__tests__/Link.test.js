// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Link } from '..';

describe('Link Component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Link url="https://labs.coremedia.com">Content</Link>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
