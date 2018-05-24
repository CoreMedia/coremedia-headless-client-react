// @flow
import React from 'react';

import Video from '..';

describe('Video Component', () => {
  it('should render correctly and proxy link prop', () => {
    const wrapper = shallow(<Video show link="coremedia:///media/6200/data" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly and proxy pictureLink, pictureAlt and pictureTitle props', () => {
    const wrapper = shallow(
      <Video
        show
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly and proxy playing prop', () => {
    const wrapper = shallow(<Video show link="coremedia:///media/6200/data" playing={false} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly and proxy loop prop', () => {
    const wrapper = shallow(<Video show link="coremedia:///media/6200/data" loop={false} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly and proxy muted prop', () => {
    const wrapper = shallow(<Video show link="coremedia:///media/6200/data" muted={false} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly and proxy controls prop', () => {
    const wrapper = shallow(<Video show link="coremedia:///media/6200/data" controls={false} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should proxy handler props', () => {
    const handleProgress = jest.fn().mockName('handleProgress');
    const handlePlay = jest.fn().mockName('handlePlay');
    const handlePause = jest.fn().mockName('handlePause');
    const handleEnded = jest.fn().mockName('handleEnded');
    const handleDuration = jest.fn().mockName('handleDuration');
    const wrapper = shallow(
      <Video
        show
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
        playing={false}
        loop={false}
        muted={false}
        controls={true}
        handleProgress={handleProgress}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handleEnded={handleEnded}
        handleDuration={handleDuration}
      />
    );
    const videoBrick = wrapper.find('VideoBrick');
    expect(videoBrick.prop('handleProgress')).toEqual(handleProgress);
    expect(videoBrick.prop('handlePlay')).toEqual(handlePlay);
    expect(videoBrick.prop('handlePause')).toEqual(handlePause);
    expect(videoBrick.prop('handleEnded')).toEqual(handleEnded);
    expect(videoBrick.prop('handleDuration')).toEqual(handleDuration);
  });
});
