// @flow
import React from 'react';

import { Teaser } from '..';

describe('Video Brick', () => {
  it('should render Teaser Component and show poster overlay', () => {
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
      />
    );
    expect(wrapper.state('playing')).toBe(false);
    expect(wrapper.state('playedSeconds')).toBe(0);
    expect(wrapper.state('showOverlay')).toBe(true);
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('should render Teaser Component without poster overlay', () => {
    const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
    expect(wrapper.state('playing')).toBe(false);
    expect(wrapper.state('playedSeconds')).toBe(0);
    expect(wrapper.state('showOverlay')).toBe(true);
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('should render Teaser Component, hide poster overlay and play video', () => {
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
      />
    );
    wrapper.instance()._handlePlay();
    expect(wrapper.state('playing')).toBe(true);
    expect(wrapper.state('showOverlay')).toBe(false);
    expect(wrapper.update()).toMatchSnapshot();
  });
  it('should pause video and call props.handlePause', () => {
    const handlePlay = jest.fn();
    const handlePause = jest.fn();
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
    );
    const inst = wrapper.instance();
    inst._handlePlay();
    expect(wrapper.state('playing')).toBe(true);
    expect(handlePlay).toHaveBeenCalled();
    inst._handlePause();
    expect(wrapper.state('playing')).toBe(false);
    expect(handlePause).toHaveBeenCalled();
  });
  it('should pause video and don´t call props.handlePause', () => {
    const handlePlay = jest.fn();
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
        handlePlay={handlePlay}
      />
    );
    const inst = wrapper.instance();
    inst._handlePlay();
    expect(wrapper.state('playing')).toBe(true);
    expect(handlePlay).toHaveBeenCalled();
    inst._handlePause();
    expect(wrapper.state('playing')).toBe(false);
  });
  it('should end video and call props.handleEnded', () => {
    const handlePlay = jest.fn();
    const handleEnded = jest.fn();
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
        handlePlay={handlePlay}
        handleEnded={handleEnded}
      />
    );
    const inst = wrapper.instance();
    inst._handlePlay();
    expect(wrapper.state('playing')).toBe(true);
    expect(handlePlay).toHaveBeenCalled();
    inst._handleEnded();
    expect(wrapper.state('playing')).toBe(false);
    expect(handleEnded).toHaveBeenCalled();
  });
  it('should end video and don´t call props.handleEnded', () => {
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
      />
    );
    const inst = wrapper.instance();
    inst._handlePlay();
    expect(wrapper.state('playing')).toBe(true);
    inst._handleEnded();
    expect(wrapper.state('playing')).toBe(false);
  });
  it('should replay video after it has been ended', () => {
    const handlePlay = jest.fn();
    const handleEnded = jest.fn();
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
        loop={true}
        handlePlay={handlePlay}
        handleEnded={handleEnded}
      />
    );
    const inst = wrapper.instance();
    inst._handlePlay();
    expect(wrapper.state('playing')).toBe(true);
    expect(handlePlay).toHaveBeenCalled();
    inst._handleEnded();
    expect(wrapper.state('playing')).toBe(true);
    expect(handleEnded).toHaveBeenCalled();
  });
  it('should store duration in state and call props.handleDuration', () => {
    const handleDuration = jest.fn();
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
        handleDuration={handleDuration}
      />
    );
    const inst = wrapper.instance();
    const duration = 1000;
    inst._handleDuration(duration);
    expect(wrapper.state('duration')).toEqual(duration);
    expect(handleDuration).toHaveBeenCalled();
  });
  it('should store duration in state and don´t call props.handleDuration', () => {
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
      />
    );
    const inst = wrapper.instance();
    const duration = 1000;
    inst._handleDuration(duration);
    expect(wrapper.state('duration')).toEqual(duration);
  });
  it('should play or pause video when receiving new value for property playing', () => {
    const handlePlay = jest.fn();
    const handlePause = jest.fn();
    const props = {
      link: 'coremedia:///media/6200/data',
      handlePlay,
      handlePause,
    };
    const wrapper = shallow(<Teaser {...props} />);
    expect(wrapper.state('playing')).toBe(false);
    wrapper.setProps({ ...props, playing: true });
    expect(wrapper.state('playing')).toBe(true);
    expect(handlePlay).toHaveBeenCalled();
    wrapper.setProps({ ...props, playing: false });
    expect(wrapper.state('playing')).toBe(false);
    expect(handlePause).toHaveBeenCalled();
  });
  it('should continue playing video when receiving new value for other property than playing', () => {
    const handlePlay = jest.fn();
    const handlePause = jest.fn();
    const props = {
      link: 'coremedia:///media/6200/data',
      handlePlay,
      handlePause,
    };
    const wrapper = shallow(<Teaser {...props} />);
    wrapper.setProps({ ...props, playing: true });
    expect(wrapper.state('playing')).toBe(true);
    wrapper.setProps({ ...props, playedSeconds: 100 });
    expect(wrapper.state('playing')).toBe(true);
  });
  it('should set state.playedSeconds and call handleProgress with playedSeconds and played', () => {
    const handleProgress = jest.fn();
    const props = {
      link: 'coremedia:///media/6200/data',
      handleProgress,
    };
    const wrapper = shallow(<Teaser {...props} />);
    const args = { playedSeconds: 10, played: 0.2 };
    wrapper.instance()._handleProgress(args);
    expect(wrapper.state('playedSeconds')).toBe(args.playedSeconds);
    expect(handleProgress).toHaveBeenCalledWith(args.playedSeconds, args.played);
  });
  it('should set state.playedSeconds and don´t call handleProgress', () => {
    const props = {
      link: 'coremedia:///media/6200/data',
    };
    const wrapper = shallow(<Teaser {...props} />);
    const args = { playedSeconds: 10, played: 0.2 };
    wrapper.instance()._handleProgress(args);
    expect(wrapper.state('playedSeconds')).toBe(args.playedSeconds);
  });
});
