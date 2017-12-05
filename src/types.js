// @flow
export type FragmentParams = {
  color?: string,
  ctaShow?: boolean,
  ctaText?: string,
  url?: string,
};

export type Config = {
  queryName: string,
  viewName: ?string,
  module: Object,
  createProps: (ownerProps: { data: Object, params: FragmentParams }) => Object,
};

export type Teaser = {
  url?: string,
  pictureLink?: string,
  pictureTitle?: string,
  pictureAlt?: string,
  title?: string,
  text?: string,
  params?: FragmentParams,
};

export type ColorProps = {
  fg: string,
  bgsolid: string,
  bgtrans: string,
  huerotation: string,
};

export type Colors = {
  [string]: ColorProps,
};

export type Breakpoints = {
  [label: string]: number,
};

export type Typography = {
  fontFamily: {
    heading: string,
    text: string,
  },
  fontWeight: {
    light: number,
    normal: number,
    bold: number,
  },
};

export type Theme = {
  [key: string]: mixed,
};
