// @flow
import * as Article from '../../components/bricks/CMArticle';
import * as Teaser from '../../components/bricks/CMTeasable';
import * as ShoppableVideo from '../../components/bricks/CMShoppableVideo';
import type { Config } from '../../types';

type ConfigSet = {
  [show: string]: Config,
};

const config: ConfigSet = {
  teaser: {
    queryName: 'teasables',
    viewName: null,
    module: Teaser,
    createProps: ({ data, params }) => {
      const picture = data.picture || {};
      return {
        url: params && params.url ? params.url : data.teaserTarget.link,
        pictureLink: picture.link,
        pictureTitle: picture.title,
        pictureAlt: picture.alt,
        title: data.teaserTitle,
        text: data.teaserText,
        params: params,
      };
    },
  },
  article: {
    queryName: 'articles',
    viewName: null,
    module: Article,
    createProps: ({ data, params }) => {
      const picture = (data.pictures && data.pictures.length > 0 && data.pictures[0]) || {};
      return {
        pictureLink: picture.link,
        pictureTitle: picture.title,
        pictureAlt: picture.alt,
        title: data.title,
        text: data.detailText,
        teaserText: data.teaserText,
        params: params,
      };
    },
  },
  video: {
    queryName: 'videos',
    viewName: null,
    module: ShoppableVideo,
    createProps: ({ data, params }) => {
      const picture = data.picture || {};
      return {
        link: data.link,
        title: data.teaserTitle,
        pictureLink: picture.link,
        pictureTitle: picture.title,
        pictureAlt: picture.alt,
        timeLine: data.timeLine,
        params: params,
      };
    },
  },
};

export default config;
