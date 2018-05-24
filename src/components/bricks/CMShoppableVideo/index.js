// @flow
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import Wrapper from './Wrapper';
import ThumbnailBar from './ThumbnailBar';
import Video from './Video';
import ProductBoard from './ProductBoard';
import QuickInfo from './QuickInfo';

type Props = {
  link: string,
  autoplay?: boolean,
  loop?: boolean,
  muted?: boolean,
  controls?: boolean,
  pictureLink?: string,
  pictureTitle?: string,
  pictureAlt?: string,
  timeLine: Object,
};

type State = {
  index: number,
  range: number,
  prevItems: number,
  shoppableWrapperWidth: number,
  thumbWidth: number,
  thumbsTranslateX: number,
  productboardOverflow: boolean,
  selectedItem: ?Object,
  playing: boolean,
  ended: boolean,
  pausedByModal: boolean,
  duration: number,
  startCrossFade: boolean,
};

class ShoppableVideoBrick extends React.PureComponent<Props, State> {
  static propTypes = {
    link: PropTypes.string.isRequired,
    autoplay: PropTypes.bool,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    controls: PropTypes.bool,
    pictureLink: PropTypes.string,
    pictureTitle: PropTypes.string,
    pictureAlt: PropTypes.string,
    timeLine: PropTypes.object,
  };

  static defaultProps = {
    autoplay: false,
    loop: false,
    muted: false,
    controls: true,
  };

  state = {
    index: -1,
    range: 0,
    prevItems: 0,
    shoppableWrapperWidth: 0,
    thumbWidth: 0,
    thumbsTranslateX: 0,
    productboardOverflow: false,
    selectedItem: null,
    playing: !!this.props.autoplay,
    ended: false,
    pausedByModal: false,
    duration: 0,
    startCrossFade: false,
  };

  _resizeTimer = null;
  _intervalId = null;
  _debounceResize = null;
  _wrapper = null;
  _thumbnailsBox = null;
  _productboardContainer = null;

  _sequences = (this.props.timeLine && Array.isArray(this.props.timeLine.sequences)
    ? this.props.timeLine.sequences
    : []
  )
    .sort((a, b) => a.startTimeMillis - b.startTimeMillis)
    .map((item, index) => Object.assign({}, item, { index }));

  _itemCount = this._sequences.reduce(
    (acc, item) => acc + (item.target.items ? item.target.items.length : 1),
    0
  );

  _getThumbsTranslate = (factor: number): number => {
    const { shoppableWrapperWidth } = this.state;

    if (this._thumbnailsBox) {
      if (this._thumbnailsBox.scrollWidth <= shoppableWrapperWidth || shoppableWrapperWidth <= 0) {
        return 0;
      }
      const totalScroll = this._thumbnailsBox.scrollWidth - shoppableWrapperWidth;
      const factorScroll = factor * this.state.thumbWidth - shoppableWrapperWidth * 0.5;

      return factorScroll < 0 ? 0 : (factorScroll < totalScroll ? factorScroll : totalScroll) * -1;
    }
    return 0;
  };

  _updateThumbnailTranslate = () => {
    if (this.state.prevItems === 0) {
      this.setState(prevState => ({ thumbsTranslateX: 0 }));
    } else {
      const factor = this.state.prevItems + this.state.range * 0.5;
      const thumbsTranslateX = this._getThumbsTranslate(factor);
      this.setState(prevState => ({ thumbsTranslateX }));
    }
  };

  _hasProductBoardOverflow = () => {
    if (this._productboardContainer) {
      const { offsetHeight, scrollHeight } = this._productboardContainer;
      return offsetHeight < scrollHeight;
    }
    return false;
  };

  _updateProductBoardOverflow = () => {
    const productboardOverflow = this._hasProductBoardOverflow();
    this.setState(prevState => ({
      productboardOverflow,
    }));
  };

  _updateShoppableWrapperWidth = () => {
    if (this._wrapper) {
      const shoppableWrapperWidth = this._wrapper.offsetWidth;
      this.setState(prevState => ({
        shoppableWrapperWidth,
      }));
    }
  };

  _updateThumbWidth = () => {
    if (this._thumbnailsBox) {
      const thumbWidth = this._thumbnailsBox.scrollWidth / this._itemCount;
      this.setState(prevState => ({ thumbWidth }));
    }
  };

  _createThumbnailProps = (index: number, item: Object) => {
    const id = `${item._id}_${index}`;
    const props = {
      id,
      active:
        ((this.state.selectedItem && this.state.selectedItem.id === id) ||
          index === this.state.index) &&
        !this.state.ended,
      teaserTitle: item.teaserTitle,
      teaserText: item.teaserText,
      pictureLink: item.picture.link,
      pictureTitle: item.picture.title,
      pictureAlt: item.picture.alt,
      price: item.price,
    };
    return {
      ...props,
      handleClick: (ev: SyntheticEvent<HTMLButtonElement>) =>
        this.setState(prevState => ({
          selectedItem: props,
          playing: false,
          pausedByModal: prevState.playing,
        })),
    };
  };

  _handleProgress = (playedSeconds: number) => {
    const filtered = this._sequences.filter(
      ({ startTimeMillis }) => !!playedSeconds && startTimeMillis / 1000 <= playedSeconds
    );
    const prevItems = filtered
      .slice(0, -1)
      .reduce((acc, item) => acc + (item.target.items ? item.target.items.length : 1), 0);
    const current = filtered.length ? filtered.pop() : undefined;
    const index = !current ? -1 : current.index;
    const range = !current ? 0 : current.target.items ? current.target.items.length : 1;
    const startCrossFade = !!this.state.duration && this.state.duration - playedSeconds <= 1;
    const productboardOverflow = startCrossFade && this._hasProductBoardOverflow();
    this.setState(prevState => ({ index, range, prevItems, startCrossFade, productboardOverflow }));
  };

  _handleDuration = (duration: number) => {
    this.setState(prevState => ({
      duration,
    }));
  };

  _handlePlay = () => {
    this.setState(prevState => ({
      playing: true,
      ended: false,
    }));
  };

  _handlePause = () => {
    this.setState(prevState => ({
      playing: false,
    }));
  };

  _handleEnded = () => {
    this.setState(prevState => ({
      ended: true,
    }));
  };

  _handleResize = () => {
    // delay initial resize to get the accurate this._shoppableWrapper height/width
    this._resizeTimer = window.setTimeout(() => {
      this._updateShoppableWrapperWidth();
      this._updateThumbWidth();
      this._updateThumbnailTranslate();
      this._updateProductBoardOverflow();
    }, 50);
  };

  _handleCloseQuickInfo = (ev: SyntheticEvent<HTMLButtonElement>) =>
    this.setState(prevState => ({
      selectedItem: null,
      playing: prevState.pausedByModal,
      pausedByModal: false,
    }));

  _handleWrapperRef = (el: ?HTMLElement) => (this._wrapper = el);

  _handleThumbnailsBoxRef = (el: ?HTMLElement) => (this._thumbnailsBox = el);

  _handleProductboardContainerRef = (el: ?HTMLElement) => (this._productboardContainer = el);

  componentDidMount() {
    // Used to update the throttle if slideDuration changes
    this._debounceResize = debounce(this._handleResize, 500);

    this._handleResize();

    window.addEventListener('resize', this._debounceResize);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.shoppableWrapperWidth !== this.state.shoppableWrapperWidth) {
      this._handleResize();
    } else {
      if (prevState.index !== this.state.index) {
        this._updateThumbnailTranslate();
      }
      if (
        this._thumbnailsBox &&
        this.state.thumbWidth !== this._thumbnailsBox.scrollWidth / this._itemCount
      ) {
        this._updateThumbWidth();
      }
    }
  }

  componentWillUnmount() {
    if (this._debounceResize) {
      window.removeEventListener('resize', this._debounceResize);
      this._debounceResize && this._debounceResize.cancel();
    }

    if (this._intervalId) {
      window.clearInterval(this._intervalId);
      this._intervalId = null;
    }

    if (this._resizeTimer) {
      window.clearTimeout(this._resizeTimer);
    }
  }

  render() {
    const { link, loop, muted, controls, pictureLink, pictureTitle, pictureAlt } = this.props;
    const {
      prevItems,
      range,
      thumbWidth,
      thumbsTranslateX,
      productboardOverflow,
      selectedItem,
      playing,
      startCrossFade,
    } = this.state;
    const thumbnails = this._sequences
      .map(({ index, target }: { index: number, target: Object }) => {
        if (target.items) {
          return target.items.map(item => this._createThumbnailProps(index, item));
        }
        return [this._createThumbnailProps(index, target)];
      })
      .reduce((acc, item) => acc.concat(item), []);
    return (
      <Wrapper innerRef={this._handleWrapperRef}>
        <Video
          show={!startCrossFade}
          link={link}
          playing={playing}
          loop={loop}
          muted={muted}
          controls={controls}
          pictureLink={pictureLink}
          pictureTitle={pictureTitle}
          pictureAlt={pictureAlt}
          handleProgress={this._handleProgress}
          handlePlay={this._handlePlay}
          handlePause={this._handlePause}
          handleEnded={this._handleEnded}
          handleDuration={this._handleDuration}
        />
        <ThumbnailBar
          translateX={thumbsTranslateX}
          thumbnails={thumbnails}
          handleRef={this._handleThumbnailsBoxRef}
          prevItems={prevItems}
          range={range}
          thumbWidth={thumbWidth}
        />
        {startCrossFade && (
          <ProductBoard
            thumbnails={thumbnails}
            productboardOverflow={productboardOverflow}
            handleRef={this._handleProductboardContainerRef}
            handleReplay={this._handlePlay}
          />
        )}
        <QuickInfo item={selectedItem} handleClose={this._handleCloseQuickInfo} />
      </Wrapper>
    );
  }
}

export { ShoppableVideoBrick as Teaser };
