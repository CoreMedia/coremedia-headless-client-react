// @flow
import React from 'react';
import 'jest-styled-components';

import Modal from '../Modal';

describe('Modal Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper).toMatchSnapshot();
  });
});
