// @flow
import React from 'react';

import CTA from '..';

describe('CTA Component', () => {
  it('should render CTA using Button', () => {
    const wrapper = shallow(<CTA text="Label" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render CTA using LinkButton', () => {
    const wrapper = shallow(<CTA url="https://labs.coremedia.com" text="Label" />);
    expect(wrapper).toMatchSnapshot();
  });
});
