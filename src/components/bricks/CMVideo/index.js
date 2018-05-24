// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import { TeaserBox } from '../../basic/Box';
import Picture from '../CMPicture';
import PosterBox from './PosterBox';
import PlayButton from './PlayButton';
import Wrapper from './Wrapper';
import { getMediaUrl } from '../../../backend';

type Props = {
  link: string,
  playing: boolean,
  loop: boolean,
  muted: boolean,
  controls: boolean,
  pictureLink?: string,
  pictureTitle?: string,
  pictureAlt?: string,
  handleProgress?: (playedSeconds: number, played: number) => void,
  handlePlay?: () => void,
  handlePause?: () => void,
  handleEnded?: () => void,
  handleDuration?: (duration: number) => void,
};

type State = {
  playing: boolean,
  playedSeconds: number,
  duration: number,
  showOverlay: boolean,
};

class VideoBrick extends React.Component<Props, State> {
  static propTypes = {
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

  static defaultProps = {
    playing: false,
    loop: false,
    muted: false,
    controls: true,
  };

  state = {
    playing: this.props.playing,
    playedSeconds: 0,
    duration: 0,
    showOverlay: !this.props.playing,
  };

  _handlePlay = () => {
    this.setState(prevState => ({
      playing: true,
      showOverlay: false,
    }));
    if (this.props.handlePlay) {
      this.props.handlePlay();
    }
  };

  _handlePause = () => {
    this.setState(prevState => ({ playing: false }));
    if (this.props.handlePause) {
      this.props.handlePause();
    }
  };

  _handleProgress = ({ playedSeconds, played }: { playedSeconds: number, played: number }) => {
    this.setState(prevState => ({ playedSeconds }));
    if (this.props.handleProgress) {
      this.props.handleProgress(this.state.playedSeconds, played);
    }
  };

  _handleEnded = () => {
    this.setState(prevState => ({ playing: this.props.loop }));
    if (this.props.handleEnded) {
      this.props.handleEnded();
    }
  };

  _handleDuration = (duration: number) => {
    this.setState(prevState => ({ duration }));
    if (this.props.handleDuration) {
      this.props.handleDuration(duration);
    }
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.playing !== this.props.playing) {
      if (nextProps.playing) {
        this._handlePlay();
      } else {
        this._handlePause();
      }
    }
  }

  render() {
    const { link, loop, muted, controls, pictureLink, pictureTitle, pictureAlt } = this.props;
    const { playing, showOverlay } = this.state;
    const content = [
      <ReactPlayer
        key="player"
        url={getMediaUrl(link)}
        playing={playing}
        loop={loop}
        muted={muted}
        controls={controls}
        onPlay={this._handlePlay}
        onPause={this._handlePause}
        onEnded={this._handleEnded}
        onProgress={this._handleProgress}
        onDuration={this._handleDuration}
        width="100%"
        height="100%"
        progressInterval={500}
      />,
    ];
    if (showOverlay) {
      content.unshift(<PlayButton key="playbutton" handleClick={this._handlePlay} />);
      if (pictureLink) {
        content.unshift(
          <PosterBox key="poster">
            <Picture
              link={pictureLink}
              ratio="landscape_ratio16x9"
              title={pictureTitle}
              alt={pictureAlt}
              stretch={true}
            />
          </PosterBox>
        );
      }
    }

    return (
      <Wrapper>
        <TeaserBox>{content}</TeaserBox>
      </Wrapper>
    );
  }
}

export { VideoBrick as Teaser };
