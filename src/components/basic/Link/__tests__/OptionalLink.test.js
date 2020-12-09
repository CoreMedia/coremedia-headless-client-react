// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { OptionalLink } from '..';

describe('OptionalLink Component', () => {
  it('should render correctly with url', () => {
    const tree = renderer
      .create(<OptionalLink url="https://labs.coremedia.com">Content</OptionalLink>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly without url', () => {
    const tree = renderer.create(<OptionalLink>Content</OptionalLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
