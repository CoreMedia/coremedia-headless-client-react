// @flow
import React from 'react';

import ThumbnailBar from '..';

describe('ThumbnailBar Component', () => {
  it('should render correctly', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const handleRef = jest.fn().mockName('handleRef');
    const wrapper = shallow(
      <ThumbnailBar
        thumbnails={[
          {
            id: 'id123',
            active: true,
            teaserTitle: 'Title',
            pictureLink: 'coremedia:///image/6188/data',
            pictureTitle: 'picture title',
            pictureAlt: 'alt',
            handleClick,
          },
        ]}
        translateX={0}
        handleRef={handleRef}
        prevItems={0}
        range={0}
        thumbWidth={78}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should calculate posX and width for ProgressBar correctly', () => {
    const handleClick = jest.fn().mockName('handleClick');
    const handleRef = jest.fn().mockName('handleRef');
    const wrapper = shallow(
      <ThumbnailBar
        thumbnails={[
          {
            id: 'id123',
            active: true,
            teaserTitle: 'Title',
            pictureLink: 'coremedia:///image/6188/data',
            pictureTitle: 'picture title',
            pictureAlt: 'alt',
            handleClick,
          },
        ]}
        translateX={0}
        handleRef={handleRef}
        prevItems={1}
        range={2}
        thumbWidth={78}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
