// @flow
import type { Colors, Breakpoints, Theme } from '../../../types';

const colors: Colors = {
  red: {
    fg: '#fafafa',
    bgsolid: 'rgba(221, 52, 40, 1)',
    bgtrans: 'rgba(221, 52, 40, 0.7)',
    huerotation: '320deg',
  },
  blue: {
    fg: '#fafafa',
    bgsolid: 'rgba(0, 108, 174, 1)',
    bgtrans: 'rgba(0, 108, 174, 0.7)',
    huerotation: '160deg',
  },
  turquoise: {
    fg: '#fafafa',
    bgsolid: 'rgba(111, 195, 184, 1)',
    bgtrans: 'rgba(111, 195, 184, 0.7)',
    huerotation: '120deg',
  },
  yellow: {
    fg: '#fafafa',
    bgsolid: 'rgba(239, 223, 15, 1)',
    bgtrans: 'rgba(239, 223, 15, 0.7)',
    huerotation: '5deg',
  },
  green: {
    fg: '#fafafa',
    bgsolid: 'rgba(47, 172, 102, 1)',
    bgtrans: 'rgba(47, 172, 102, 0.7)',
    huerotation: '80deg',
  },
  default: {
    fg: '#fafafa',
    bgsolid: 'rgba(239, 223, 15, 1)',
    bgtrans: 'rgba(239, 223, 15, 0.7)',
    huerotation: '5deg',
  },
};

const breakpoints: Breakpoints = {
  small: 480,
  tablet: 768,
  desktop: 992,
  large: 1280,
};

const theme: Theme = {
  name: 'hkm',
  breakpoints,
  colors,
};

export default theme;
