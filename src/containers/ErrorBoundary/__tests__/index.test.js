// @flow
import React from 'react';

import ErrorBoundary from '..';

describe('ErrorBoundary Container', () => {
  it('should render children', () => {
    const wrapper = shallow(<ErrorBoundary>Content</ErrorBoundary>);
    expect(wrapper.state('errorInfo')).toEqual(null);
    expect(wrapper.state('error')).toEqual(null);
    expect(wrapper.text()).toEqual('Content');
  });

  it('should render ErrorBox Component', () => {
    const error = new Error('I am an error message.');
    const errorInfo = {
      componentStack: 'I am a componentStack.',
    };
    const wrapper = shallow(<ErrorBoundary>Content</ErrorBoundary>);
    wrapper.instance().componentDidCatch(error, errorInfo);
    expect(wrapper.state('error')).toEqual(error);
    expect(wrapper.state('errorInfo')).toEqual(errorInfo);
    expect(wrapper.update()).toMatchSnapshot();
  });
});
