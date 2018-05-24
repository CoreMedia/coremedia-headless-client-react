// @flow
import React from 'react';

import ProductCard from '..';

describe('ProductCard Component', () => {
  it('should render correctly', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const wrapper = shallow(
      <ProductCard
        index={1}
        entered={true}
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Picture Title 1"
        pictureAlt="Picture Alt 1"
        title="Title 1"
        price={100}
        handleClick={handleClick}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should prevent update', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const props = {
      index: 1,
      entered: false,
      pictureLink: 'coremedia:///image/6188/data',
      pictureTitle: 'Title',
      pictureAlt: 'Alt',
      title: 'Title',
      price: 100,
      handleClick,
    };
    const wrapper = shallow(<ProductCard {...props} />);
    const value = wrapper.instance().shouldComponentUpdate(props);
    expect(value).toBe(false);
  });
  it('should permit update', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const props = {
      index: 1,
      entered: false,
      pictureLink: 'coremedia:///image/6188/data',
      pictureTitle: 'Title',
      pictureAlt: 'Alt',
      title: 'Title',
      price: 100,
      handleClick,
    };
    const wrapper = shallow(<ProductCard {...props} />);
    const instance = wrapper.instance();
    const valueA = wrapper.instance().shouldComponentUpdate({ ...props, index: 2 });
    const valueB = wrapper.instance().shouldComponentUpdate({ ...props, entered: true });
    const valueC = instance.shouldComponentUpdate({
      ...props,
      pictureLink: 'coremedia:///image/6162/data',
    });
    const valueD = instance.shouldComponentUpdate({ ...props, pictureTitle: 'new Title' });
    const valueE = instance.shouldComponentUpdate({ ...props, pictureAlt: 'new Alt' });
    const valueF = instance.shouldComponentUpdate({ ...props, title: 'new Title' });
    const valueG = instance.shouldComponentUpdate({ ...props, price: 99 });
    expect(valueA).toBe(true);
    expect(valueB).toBe(true);
    expect(valueC).toBe(true);
    expect(valueD).toBe(true);
    expect(valueE).toBe(true);
    expect(valueF).toBe(true);
    expect(valueG).toBe(true);
  });
});
