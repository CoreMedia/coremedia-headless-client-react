// @flow
import React from 'react';

import Picture from '..';

describe('Picture Component', () => {
  it('should render Picture with Link, Picture and CTA', () => {
    const wrapper = shallow(
      <Picture
        color="red"
        link="coremedia:///image/2662/data"
        ratio="portrait_ratio1x1"
        title="Scrum"
        theme={{
          breakpoints: {
            small: 480,
            tablet: 768,
            desktop: 992,
            large: 1280,
          },
        }}
      />
    );
    expect(wrapper.shallow()).toMatchSnapshot();
  });
});
