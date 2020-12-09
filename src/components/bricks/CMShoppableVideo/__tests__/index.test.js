// @flow
import React from 'react';

jest.useFakeTimers();

const { Teaser } = require('../');

describe('ShoppableVideoBrick Component', () => {
  it('should render correctly', () => {
    const timeLine = {
      sequences: [
        {
          startTimeMillis: 3000,
          target: {
            items: [
              {
                _id: 'coremedia:///cap/content/6268',
                teaserTitle: 'HKMX DK Comfort Sports Leggings',
                teaserText:
                  'Be ready for the gym with these comfortable sports leggings from our DK collection. They are made from very breathable fabric that feels nice and light during sports and exercise. Combine with matching items from the HKMX DK collection.',
                picture: {
                  title: 'Comfort Sports Leggings',
                  alt: 'Comfort Sports Leggings',
                  link: 'coremedia:///image/6266/data',
                },
                price: 37.99,
              },
              {
                _id: 'coremedia:///cap/content/6232',
                teaserTitle: 'HKMX DK The All Star Level 2 Bra',
                teaserText:
                  'This DK sports bra features a pretty floral print for a feminine touch. This level 2 sports bra provides medium support for fairly intensive exercise such as jogging and running.',
                picture: {
                  title: 'The All Star Level 2 Bra',
                  alt: 'The All Star Level 2 Bra',
                  link: 'coremedia:///image/6208/data',
                },
                price: 37.99,
              },
            ],
          },
        },
        {
          startTimeMillis: 18000,
          target: {
            _id: 'coremedia:///cap/content/6196',
            teaserTitle: 'HKMX DK Sweater',
            teaserText:
              'This warm sweater from our Doutzen collection is ideal for wearing after your workout. It will keep nice and warm even on cold days. Combine with matching items from the DK collection.',
            picture: {
              title: 'Sweater',
              alt: 'Sweater',
              link: 'coremedia:///image/6226/data',
            },
            price: 42.99,
          },
        },
      ],
    };
    const wrapper = shallow(
      <Teaser
        link="coremedia:///media/6200/data"
        pictureLink="coremedia:///image/6188/data"
        pictureTitle="Title"
        pictureAlt="Alt"
        timeLine={timeLine}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should initialize state correctly', () => {
    const timeLine = {
      sequences: [
        {
          startTimeMillis: 18000,
          target: {
            _id: 'coremedia:///cap/content/6196',
            teaserTitle: 'HKMX DK Sweater',
            teaserText:
              'This warm sweater from our Doutzen collection is ideal for wearing after your workout. It will keep nice and warm even on cold days. Combine with matching items from the DK collection.',
            picture: {
              title: 'Sweater',
              alt: 'Sweater',
              link: 'coremedia:///image/6226/data',
            },
            price: 42.99,
          },
        },
      ],
    };
    const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" timeLine={timeLine} />);
    const expected = {
      index: -1,
      range: 0,
      prevItems: 0,
      shoppableWrapperWidth: 0,
      thumbWidth: 0,
      thumbsTranslateX: 0,
      productboardOverflow: false,
      selectedItem: null,
      playing: false,
      ended: false,
      pausedByModal: false,
      duration: 0,
      startCrossFade: false,
    };
    expect(wrapper.state()).toEqual(expected);
  });
  it('should initialize state correctly (playing)', () => {
    const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" autoplay={true} />);
    expect(wrapper.state('playing')).toBe(true);
  });
  it('should set state correctly using _handleDuration', () => {
    const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
    const duration = 1001;
    wrapper.instance()._handleDuration(duration);
    expect(wrapper.state('duration')).toEqual(duration);
  });
  it('should set state correctly using _handlePlay', () => {
    const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
    wrapper.instance()._handlePlay();
    expect(wrapper.state('playing')).toBe(true);
    expect(wrapper.state('ended')).toBe(false);
  });
  it('should set state correctly using _handlePause', () => {
    const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
    wrapper.instance()._handlePlay();
    wrapper.instance()._handlePause();
    expect(wrapper.state('playing')).toBe(false);
  });
  it('should set state correctly using _handleEnded', () => {
    const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
    wrapper.instance()._handleEnded();
    expect(wrapper.state('ended')).toBe(true);
  });
  describe('_handleProgress', () => {
    it('should set state correctly when no sequence matches current progress', () => {
      const timeLine = {
        sequences: [
          {
            startTimeMillis: 3000,
            target: {
              items: [
                {
                  _id: 'coremedia:///cap/content/6268',
                  teaserTitle: 'HKMX DK Comfort Sports Leggings',
                  teaserText:
                    'Be ready for the gym with these comfortable sports leggings from our DK collection. They are made from very breathable fabric that feels nice and light during sports and exercise. Combine with matching items from the HKMX DK collection.',
                  picture: {
                    title: 'Comfort Sports Leggings',
                    alt: 'Comfort Sports Leggings',
                    link: 'coremedia:///image/6266/data',
                  },
                  price: 37.99,
                },
                {
                  _id: 'coremedia:///cap/content/6232',
                  teaserTitle: 'HKMX DK The All Star Level 2 Bra',
                  teaserText:
                    'This DK sports bra features a pretty floral print for a feminine touch. This level 2 sports bra provides medium support for fairly intensive exercise such as jogging and running.',
                  picture: {
                    title: 'The All Star Level 2 Bra',
                    alt: 'The All Star Level 2 Bra',
                    link: 'coremedia:///image/6208/data',
                  },
                  price: 37.99,
                },
              ],
            },
          },
          {
            startTimeMillis: 18000,
            target: {
              _id: 'coremedia:///cap/content/6196',
              teaserTitle: 'HKMX DK Sweater',
              teaserText:
                'This warm sweater from our Doutzen collection is ideal for wearing after your workout. It will keep nice and warm even on cold days. Combine with matching items from the DK collection.',
              picture: {
                title: 'Sweater',
                alt: 'Sweater',
                link: 'coremedia:///image/6226/data',
              },
              price: 42.99,
            },
          },
        ],
      };
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" timeLine={timeLine} />);
      wrapper.instance()._handleProgress(1);
      expect(wrapper.state('index')).toBe(-1);
      expect(wrapper.state('range')).toBe(0);
      expect(wrapper.state('prevItems')).toBe(0);
      expect(wrapper.state('startCrossFade')).toBe(false);
    });
    it('should set state correctly when first sequence matches current progress', () => {
      const timeLine = {
        sequences: [
          {
            startTimeMillis: 3000,
            target: {
              items: [
                {
                  _id: 'coremedia:///cap/content/6268',
                  teaserTitle: 'HKMX DK Comfort Sports Leggings',
                  teaserText:
                    'Be ready for the gym with these comfortable sports leggings from our DK collection. They are made from very breathable fabric that feels nice and light during sports and exercise. Combine with matching items from the HKMX DK collection.',
                  picture: {
                    title: 'Comfort Sports Leggings',
                    alt: 'Comfort Sports Leggings',
                    link: 'coremedia:///image/6266/data',
                  },
                  price: 37.99,
                },
                {
                  _id: 'coremedia:///cap/content/6232',
                  teaserTitle: 'HKMX DK The All Star Level 2 Bra',
                  teaserText:
                    'This DK sports bra features a pretty floral print for a feminine touch. This level 2 sports bra provides medium support for fairly intensive exercise such as jogging and running.',
                  picture: {
                    title: 'The All Star Level 2 Bra',
                    alt: 'The All Star Level 2 Bra',
                    link: 'coremedia:///image/6208/data',
                  },
                  price: 37.99,
                },
              ],
            },
          },
          {
            startTimeMillis: 18000,
            target: {
              _id: 'coremedia:///cap/content/6196',
              teaserTitle: 'HKMX DK Sweater',
              teaserText:
                'This warm sweater from our Doutzen collection is ideal for wearing after your workout. It will keep nice and warm even on cold days. Combine with matching items from the DK collection.',
              picture: {
                title: 'Sweater',
                alt: 'Sweater',
                link: 'coremedia:///image/6226/data',
              },
              price: 42.99,
            },
          },
        ],
      };
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" timeLine={timeLine} />);
      wrapper.instance()._handleProgress(3);
      expect(wrapper.state('index')).toBe(0);
      expect(wrapper.state('range')).toBe(2);
      expect(wrapper.state('prevItems')).toBe(0);
      expect(wrapper.state('startCrossFade')).toBe(false);
    });
    it('should set state correctly when second sequence matches current progress', () => {
      const timeLine = {
        sequences: [
          {
            startTimeMillis: 3000,
            target: {
              items: [
                {
                  _id: 'coremedia:///cap/content/6268',
                  teaserTitle: 'HKMX DK Comfort Sports Leggings',
                  teaserText:
                    'Be ready for the gym with these comfortable sports leggings from our DK collection. They are made from very breathable fabric that feels nice and light during sports and exercise. Combine with matching items from the HKMX DK collection.',
                  picture: {
                    title: 'Comfort Sports Leggings',
                    alt: 'Comfort Sports Leggings',
                    link: 'coremedia:///image/6266/data',
                  },
                  price: 37.99,
                },
                {
                  _id: 'coremedia:///cap/content/6232',
                  teaserTitle: 'HKMX DK The All Star Level 2 Bra',
                  teaserText:
                    'This DK sports bra features a pretty floral print for a feminine touch. This level 2 sports bra provides medium support for fairly intensive exercise such as jogging and running.',
                  picture: {
                    title: 'The All Star Level 2 Bra',
                    alt: 'The All Star Level 2 Bra',
                    link: 'coremedia:///image/6208/data',
                  },
                  price: 37.99,
                },
              ],
            },
          },
          {
            startTimeMillis: 18000,
            target: {
              _id: 'coremedia:///cap/content/6196',
              teaserTitle: 'HKMX DK Sweater',
              teaserText:
                'This warm sweater from our Doutzen collection is ideal for wearing after your workout. It will keep nice and warm even on cold days. Combine with matching items from the DK collection.',
              picture: {
                title: 'Sweater',
                alt: 'Sweater',
                link: 'coremedia:///image/6226/data',
              },
              price: 42.99,
            },
          },
        ],
      };
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" timeLine={timeLine} />);
      wrapper.instance()._handleProgress(18);
      expect(wrapper.state('index')).toBe(1);
      expect(wrapper.state('range')).toBe(1);
      expect(wrapper.state('prevItems')).toBe(2);
      expect(wrapper.state('startCrossFade')).toBe(false);
    });
    it('should set startCrossFade state correctly', () => {
      const timeLine = {
        sequences: [
          {
            startTimeMillis: 3000,
            target: {
              items: [
                {
                  _id: 'coremedia:///cap/content/6268',
                  teaserTitle: 'HKMX DK Comfort Sports Leggings',
                  teaserText:
                    'Be ready for the gym with these comfortable sports leggings from our DK collection. They are made from very breathable fabric that feels nice and light during sports and exercise. Combine with matching items from the HKMX DK collection.',
                  picture: {
                    title: 'Comfort Sports Leggings',
                    alt: 'Comfort Sports Leggings',
                    link: 'coremedia:///image/6266/data',
                  },
                  price: 37.99,
                },
                {
                  _id: 'coremedia:///cap/content/6232',
                  teaserTitle: 'HKMX DK The All Star Level 2 Bra',
                  teaserText:
                    'This DK sports bra features a pretty floral print for a feminine touch. This level 2 sports bra provides medium support for fairly intensive exercise such as jogging and running.',
                  picture: {
                    title: 'The All Star Level 2 Bra',
                    alt: 'The All Star Level 2 Bra',
                    link: 'coremedia:///image/6208/data',
                  },
                  price: 37.99,
                },
              ],
            },
          },
          {
            startTimeMillis: 18000,
            target: {
              _id: 'coremedia:///cap/content/6196',
              teaserTitle: 'HKMX DK Sweater',
              teaserText:
                'This warm sweater from our Doutzen collection is ideal for wearing after your workout. It will keep nice and warm even on cold days. Combine with matching items from the DK collection.',
              picture: {
                title: 'Sweater',
                alt: 'Sweater',
                link: 'coremedia:///image/6226/data',
              },
              price: 42.99,
            },
          },
        ],
      };
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" timeLine={timeLine} />);
      wrapper.instance()._handleDuration(20);
      wrapper.instance()._handleProgress(19);
      expect(wrapper.state('index')).toBe(1);
      expect(wrapper.state('range')).toBe(1);
      expect(wrapper.state('prevItems')).toBe(2);
      expect(wrapper.state('startCrossFade')).toBe(true);
    });
  });
  it('should set state correctly using _handleResize', () => {
    const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
    const inst = wrapper.instance();
    const offsetWidth = 1024;
    inst._wrapper = { offsetWidth };
    inst._updateThumbnailTranslate = jest.fn();
    inst._handleResize();
    jest.runAllTimers();
    expect(wrapper.state('shoppableWrapperWidth')).toEqual(offsetWidth);
    expect(inst._updateThumbnailTranslate).toBeCalled();
  });
  describe('_getThumbsTranslate', () => {
    it('should return 0', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      wrapper.setState({
        shoppableWrapperWidth: 800,
        thumbWidth: 100,
      });
      const value = inst._getThumbsTranslate(6);
      expect(value).toBe(0);
    });
    it('should return 0', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      wrapper.setState({
        shoppableWrapperWidth: 800,
        thumbWidth: 100,
      });
      inst._thumbnailsBox = {
        scrollWidth: 800,
      };
      const value = inst._getThumbsTranslate(6);
      expect(value).toBe(0);
    });
    it('should return 0', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      wrapper.setState({
        shoppableWrapperWidth: 0,
      });
      inst._thumbnailsBox = {
        scrollWidth: 800,
        thumbWidth: 100,
      };
      const value = inst._getThumbsTranslate(6);
      expect(value).toBe(0);
    });
    it('should return 0', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      wrapper.setState({
        shoppableWrapperWidth: 800,
      });
      inst._thumbnailsBox = {
        scrollWidth: 1000,
        thumbWidth: 100,
      };
      const value = inst._getThumbsTranslate(1);
      expect(value).toBe(0);
    });
    it('should return -100', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      wrapper.setState({
        shoppableWrapperWidth: 800,
        thumbWidth: 100,
      });
      inst._thumbnailsBox = {
        scrollWidth: 1000,
      };
      const value = inst._getThumbsTranslate(5);
      expect(value).toBe(-100);
    });
    it('should return -200', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      wrapper.setState({
        shoppableWrapperWidth: 800,
        thumbWidth: 100,
      });
      inst._thumbnailsBox = {
        scrollWidth: 1000,
      };
      const value = inst._getThumbsTranslate(10);
      expect(value).toBe(-200);
    });
  });
  describe('_updateThumbnailTranslate', () => {
    it('should set state.thumbsTranslateX to 0', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      wrapper.setState({
        prevItems: 0,
        thumbsTranslateX: -100,
      });
      inst._updateThumbnailTranslate();
      expect(wrapper.state('thumbsTranslateX')).toBe(0);
    });
    it('should call _getThumbsTranslate with 2', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      inst._getThumbsTranslate = jest.fn().mockReturnValue(100);
      wrapper.setState({
        prevItems: 1,
        range: 2,
      });
      inst._updateThumbnailTranslate();
      expect(inst._getThumbsTranslate).toHaveBeenCalledWith(2);
    });
  });
  describe('_hasProductBoardOverflow', () => {
    it('should return false', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      const value = inst._hasProductBoardOverflow();
      expect(value).toBe(false);
    });
    it('should return false', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      inst._productboardContainer = {
        offsetHeight: 800,
        scrollHeight: 800,
      };
      const value = inst._hasProductBoardOverflow();
      expect(value).toBe(false);
    });
    it('should return false', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      inst._productboardContainer = {
        offsetHeight: 800,
        scrollHeight: 600,
      };
      const value = inst._hasProductBoardOverflow();
      expect(value).toBe(false);
    });
    it('should return true', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      inst._productboardContainer = {
        offsetHeight: 800,
        scrollHeight: 1000,
      };
      const value = inst._hasProductBoardOverflow();
      expect(value).toBe(true);
    });
  });
  describe('_updateProductBoardOverflow', () => {
    it('should set state.productboardOverflow to false', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      wrapper.setState({
        productboardOverflow: true,
      });
      inst._productboardContainer = {
        offsetHeight: 800,
        scrollHeight: 800,
      };
      inst._updateProductBoardOverflow();
      expect(wrapper.state('productboardOverflow')).toBe(false);
    });
    it('should set state.productboardOverflow to true', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();
      wrapper.setState({
        productboardOverflow: false,
      });
      inst._productboardContainer = {
        offsetHeight: 800,
        scrollHeight: 1000,
      };
      inst._updateProductBoardOverflow();
      expect(wrapper.state('productboardOverflow')).toBe(true);
    });
  });
  describe('_createThumbnailProps()', () => {
    it('should return props', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      const value = inst._createThumbnailProps(1, {
        _id: 'ID',
        teaserTitle: 'Teaser Title',
        teaserText: 'Teaser Text',
        picture: {
          link: 'coremedia:///media/6288',
          title: 'Picture Title',
          alt: 'Picture Alt',
        },
        price: 100,
      });
      expect(value).toMatchSnapshot();
    });
    it('should return props with active=true', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      wrapper.setState({
        ended: false,
        selectedItem: {
          id: 'ID_1',
        },
      });
      const value = inst._createThumbnailProps(1, {
        _id: 'ID',
        teaserTitle: 'Teaser Title',
        teaserText: 'Teaser Text',
        picture: {
          link: 'coremedia:///media/6288',
          title: 'Picture Title',
          alt: 'Picture Alt',
        },
        price: 100,
      });
      expect(value.active).toBe(true);
    });
    it('should return props with active=false', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      wrapper.setState({
        ended: false,
        index: 1,
      });
      const value = inst._createThumbnailProps(1, {
        _id: 'ID',
        teaserTitle: 'Teaser Title',
        teaserText: 'Teaser Text',
        picture: {
          link: 'coremedia:///media/6288',
          title: 'Picture Title',
          alt: 'Picture Alt',
        },
        price: 100,
      });
      expect(value.active).toBe(true);
    });
    it('should return props with active=false', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      wrapper.setState({
        ended: true,
        selectedItem: {
          id: 'ID_1',
        },
      });
      const value = inst._createThumbnailProps(1, {
        _id: 'ID',
        teaserTitle: 'Teaser Title',
        teaserText: 'Teaser Text',
        picture: {
          link: 'coremedia:///media/6288',
          title: 'Picture Title',
          alt: 'Picture Alt',
        },
        price: 100,
      });
      expect(value.active).toBe(false);
    });
    it('should return props with active=false', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      wrapper.setState({
        ended: true,
        selectedItem: {
          id: 'ID_2',
        },
      });
      const value = inst._createThumbnailProps(1, {
        _id: 'ID',
        teaserTitle: 'Teaser Title',
        teaserText: 'Teaser Text',
        picture: {
          link: 'coremedia:///media/6288',
          title: 'Picture Title',
          alt: 'Picture Alt',
        },
        price: 100,
      });
      expect(value.active).toBe(false);
    });
    it('should return props with active=false', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      wrapper.setState({
        ended: false,
        index: 2,
      });
      const value = inst._createThumbnailProps(1, {
        _id: 'ID',
        teaserTitle: 'Teaser Title',
        teaserText: 'Teaser Text',
        picture: {
          link: 'coremedia:///media/6288',
          title: 'Picture Title',
          alt: 'Picture Alt',
        },
        price: 100,
      });
      expect(value.active).toBe(false);
    });
    it('should return props with active=false', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      const value = inst._createThumbnailProps(1, {
        _id: 'ID',
        teaserTitle: 'Teaser Title',
        teaserText: 'Teaser Text',
        picture: {
          link: 'coremedia:///media/6288',
          title: 'Picture Title',
          alt: 'Picture Alt',
        },
        price: 100,
      });
      expect(value.active).toBe(false);
    });
    describe('handleClick()', () => {
      it('should change state', () => {
        const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
        const inst = wrapper.instance();

        const { handleClick, ...props } = inst._createThumbnailProps(1, {
          _id: 'ID',
          teaserTitle: 'Teaser Title',
          teaserText: 'Teaser Text',
          picture: {
            link: 'coremedia:///media/6288',
            title: 'Picture Title',
            alt: 'Picture Alt',
          },
          price: 100,
        });
        handleClick();
        expect(wrapper.state('selectedItem')).toEqual(props);
        expect(wrapper.state('playing')).toBe(false);
        expect(wrapper.state('pausedByModal')).toBe(false);
      });
    });
  });
  describe('_handleCloseQuickInfo()', () => {
    it('should change state', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      wrapper.setState({
        selectedItem: {
          id: 123,
        },
        playing: false,
        pausedByModal: false,
      });
      inst._handleCloseQuickInfo();
      expect(wrapper.state('selectedItem')).toBe(null);
      expect(wrapper.state('playing')).toBe(false);
      expect(wrapper.state('pausedByModal')).toBe(false);
    });
    it('should change state', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      wrapper.setState({
        selectedItem: {
          id: 123,
        },
        playing: false,
        pausedByModal: true,
      });
      inst._handleCloseQuickInfo();
      expect(wrapper.state('selectedItem')).toBe(null);
      expect(wrapper.state('playing')).toBe(true);
      expect(wrapper.state('pausedByModal')).toBe(false);
    });
  });
  describe('_handleWrapperRef()', () => {
    it('should set this._wrapper', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      const _wrapper = 'Wrapper';
      inst._handleWrapperRef(_wrapper);
      expect(inst._wrapper).toEqual(_wrapper);
    });
  });
  describe('_handleThumbnailsBoxRef()', () => {
    it('should set this._thumbnailsBox', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      const _thumbnailsBox = 'ThumbnailsBox';
      inst._handleThumbnailsBoxRef(_thumbnailsBox);
      expect(inst._thumbnailsBox).toEqual(_thumbnailsBox);
    });
  });
  describe('_handleProductboardContainerRef()', () => {
    it('should set this._productboardContainer', () => {
      const wrapper = shallow(<Teaser link="coremedia:///media/6200/data" />);
      const inst = wrapper.instance();

      const _productboardContainer = 'ProductboardContainer';
      inst._handleProductboardContainerRef(_productboardContainer);
      expect(inst._productboardContainer).toEqual(_productboardContainer);
    });
  });
});
