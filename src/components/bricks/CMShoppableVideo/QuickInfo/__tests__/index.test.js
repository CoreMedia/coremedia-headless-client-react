// @flow
import React from 'react';
import 'jest-styled-components';

import QuickInfo from '..';

describe('QuickInfo Component', () => {
  it('should render correctly', () => {
    const item = {
      teaserTitle: 'Title',
      teaserText: 'Text',
      pictureLink: 'Link',
      pictureTitle: 'Picture Title',
      pictureAlt: 'Picture Alt',
      price: '100',
    };
    const handleClose = jest.fn().mockName('handleClose');
    const wrapper = shallow(<QuickInfo item={item} handleClose={handleClose} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should execute handleClose', () => {
    const item = {
      teaserTitle: 'Title',
      teaserText: 'Text',
      pictureLink: 'Link',
      pictureTitle: 'Picture Title',
      pictureAlt: 'Picture Alt',
      price: '100',
    };
    const handleClose = jest.fn().mockName('handleClose');
    const wrapper = shallow(<QuickInfo item={item} handleClose={handleClose} />);
    wrapper.simulate('requestClose');
    expect(handleClose).toHaveBeenCalled();
  });
});
