// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Img from '../Img';

describe('Title Component', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Img
          src="https://labs.coremedia.com/images/dummy.jpg"
          alt="description"
          title="Title"
          color="red"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
