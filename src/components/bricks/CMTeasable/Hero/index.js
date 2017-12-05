// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import Picture from '../../CMPicture';
import Overlay from '../Overlay';
import { TeaserBox } from '../../../basic/Box';
import { OptionalLink } from '../../../basic/Link';
import Strings from '../../../../l18n';
import type { Teaser } from '../../../../types';

const composeContent = ({
  url,
  pictureLink,
  pictureTitle,
  pictureAlt,
  title,
  text,
  params,
}: Teaser): React.Node => {
  const color = params && params.color;
  const content = [];
  if (pictureLink) {
    content.push(
      <Picture
        key="picture"
        link={pictureLink}
        ratio="landscape_ratio16x9"
        title={pictureTitle}
        alt={pictureAlt}
        color={color}
      />
    );
  }
  if (title || text || (params && params.ctaShow)) {
    content.push(
      <Overlay
        key="overlay"
        fixed={false}
        width={70}
        height="auto"
        bottom="5%"
        title={title}
        text={text}
        color={color}
        ctaShow={!!params && !!params.ctaShow && !!url}
        ctaText={(params && params.ctaText) || Strings.hero_cta_text}
      />
    );
  }
  return content;
};

const HeroTeaser = ({
  url,
  pictureLink,
  pictureTitle,
  pictureAlt,
  title,
  text,
  params = {},
}: Teaser) => (
  <OptionalLink url={url}>
    <TeaserBox>
      {composeContent({ url, pictureLink, pictureTitle, pictureAlt, title, text, params })}
    </TeaserBox>
  </OptionalLink>
);

HeroTeaser.propTypes = {
  url: PropTypes.string,
  pictureLink: PropTypes.string,
  pictureTitle: PropTypes.string,
  pictureAlt: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  params: PropTypes.shape({
    color: PropTypes.string,
    ctaShow: PropTypes.bool,
    ctaText: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default HeroTeaser;
