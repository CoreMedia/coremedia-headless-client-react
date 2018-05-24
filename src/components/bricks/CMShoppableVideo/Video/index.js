// @flow
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Teaser } from '../../CMVideo';

export const VideoBox = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.6s linear 0s;
`;

VideoBox.displayName = 'VideoBox';

type Props = {
  show: boolean,
  link: string,
  playing?: boolean,
  loop?: boolean,
  muted?: boolean,
  controls?: boolean,
  pictureLink?: string,
  pictureTitle?: string,
  pictureAlt?: string,
  handleProgress?: (playedSeconds: number, played: number) => void,
  handlePlay?: () => void,
  handlePause?: () => void,
  handleEnded?: () => void,
  handleDuration?: (duration: number) => void,
};

const Video = ({
  show,
  link,
  playing,
  loop,
  muted,
  controls,
  pictureLink,
  pictureTitle,
  pictureAlt,
  handleProgress,
  handlePlay,
  handlePause,
  handleEnded,
  handleDuration,
}: Props) => (
  <VideoBox show={show}>
    <Teaser
      link={link}
      playing={playing}
      loop={loop}
      muted={muted}
      controls={controls}
      pictureLink={pictureLink}
      pictureTitle={pictureTitle}
      pictureAlt={pictureAlt}
      handleProgress={handleProgress}
      handlePlay={handlePlay}
      handlePause={handlePause}
      handleEnded={handleEnded}
      handleDuration={handleDuration}
    />
  </VideoBox>
);

Video.propTypes = {
  show: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  controls: PropTypes.bool,
  pictureLink: PropTypes.string,
  pictureTitle: PropTypes.string,
  pictureAlt: PropTypes.string,
  handleProgress: PropTypes.func,
  handlePlay: PropTypes.func,
  handlePause: PropTypes.func,
  handleEnded: PropTypes.func,
  handleDuration: PropTypes.func,
};

export default Video;
