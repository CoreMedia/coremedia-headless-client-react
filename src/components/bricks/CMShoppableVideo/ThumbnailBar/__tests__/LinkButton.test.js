// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import LinkButton from '../LinkButton';

describe('LinkButton Component', () => {
  it('should render active correctly', () => {
    const tree = renderer.create(<LinkButton active>Content</LinkButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render inactive with ariaLabel correctly', () => {
    const tree = renderer.create(<LinkButton active={false}>Content</LinkButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should render inactive correctly', () => {
    const tree = renderer
      .create(
        <LinkButton active={false} ariaLabel="label name">
          Content
        </LinkButton>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
