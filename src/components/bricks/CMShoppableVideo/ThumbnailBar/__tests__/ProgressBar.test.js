// @flow
import React from 'react';

import ProgressBar from '../ProgressBar';

describe('ProgressBar Component', () => {
  it('should render correctly with default props', () => {
    const wrapper = shallow(<ProgressBar />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly with custom props', () => {
    const wrapper = shallow(<ProgressBar posX={10} width={20} />);
    expect(wrapper).toMatchSnapshot();
  });
});
