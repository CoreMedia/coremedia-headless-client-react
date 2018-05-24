// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import PlayButton from '../PlayButton';

describe('PlayButton Container', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<PlayButton handleClick={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should execute onClick handler', async () => {
    const handleClick = jest.fn();
    const wrapper = shallow(<PlayButton handleClick={handleClick} />);
    wrapper.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
