// @flow
import React from 'react';

import Picture from '..';

describe('Picture Component', () => {
  it('should render correctly', () => {
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
  it('should render correctly without <sources> element', () => {
    const wrapper = shallow(
      <Picture
        color="red"
        link="coremedia:///image/2662/data"
        ratio="portrait_ratio1x1"
        title="Scrum"
        theme={{}}
      />
    );
    expect(wrapper.shallow()).toMatchSnapshot();
  });
  it('should render correctly with ratio thumbnail', () => {
    const wrapper = shallow(
      <Picture
        color="red"
        link="coremedia:///image/2662/data"
        ratio="thumbnail"
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
  it('should render correctly and skip breakpoint large', () => {
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
            large: '1280',
          },
        }}
      />
    );
    expect(wrapper.shallow()).toMatchSnapshot();
  });
});
