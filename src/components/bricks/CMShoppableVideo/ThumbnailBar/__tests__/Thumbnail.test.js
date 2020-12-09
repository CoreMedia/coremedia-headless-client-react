// @flow
import React from 'react';

import Thumbnail from '../Thumbnail';

describe('Thumbnail Component', () => {
  it('should render correctly with default props', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const wrapper = shallow(
      <Thumbnail
        active={false}
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
        handleClick={handleClick}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should prevent update', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const props = {
      active: false,
      pictureLink: 'coremedia:///image/6188/data',
      pictureTitle: 'Title',
      pictureAlt: 'Alt',
      handleClick,
    };
    const wrapper = shallow(<Thumbnail {...props} />);
    const value = wrapper.instance().shouldComponentUpdate(props);
    expect(value).toBe(false);
  });
  it('should permit update', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const props = {
      active: false,
      pictureLink: 'coremedia:///image/6188/data',
      pictureTitle: 'Title',
      pictureAlt: 'Alt',
      handleClick,
    };
    const wrapper = shallow(<Thumbnail {...props} />);
    const instance = wrapper.instance();
    const valueA = wrapper.instance().shouldComponentUpdate({ ...props, active: true });
    const valueB = instance.shouldComponentUpdate({
      ...props,
      pictureLink: 'coremedia:///image/6162/data',
    });
    const valueC = instance.shouldComponentUpdate({ ...props, pictureTitle: 'new Title' });
    const valueD = instance.shouldComponentUpdate({ ...props, pictureAlt: 'new Alt' });
    const valueE = instance.shouldComponentUpdate({ ...props, ariaLabel: 'new Label' });
    expect(valueA).toBe(true);
    expect(valueB).toBe(true);
    expect(valueC).toBe(true);
    expect(valueD).toBe(true);
    expect(valueE).toBe(true);
  });
});
