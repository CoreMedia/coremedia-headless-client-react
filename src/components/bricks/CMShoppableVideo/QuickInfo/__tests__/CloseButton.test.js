// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import CloseButton from '../CloseButton';

describe('CloseButton Container', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<CloseButton handleClick={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should execute onClick handler', async () => {
    const handleClick = jest.fn();
    const wrapper = shallow(<CloseButton handleClick={handleClick} />);
    wrapper.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
