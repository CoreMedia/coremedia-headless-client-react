// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ReloadButton from '../ReloadButton';

describe('ReloadButton Component', () => {
  it('should render correctly', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const tree = renderer.create(<ReloadButton id="id123" handleClick={handleClick} />);
    expect(tree).toMatchSnapshot();
  });
  it('should call handleClick', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const wrapper = shallow(<ReloadButton id="id123" handleClick={handleClick} />);
    wrapper.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
