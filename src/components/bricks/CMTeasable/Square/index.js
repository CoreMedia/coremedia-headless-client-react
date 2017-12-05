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
        ratio="portrait_ratio1x1"
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
        width={100}
        height="45%"
        bottom="0%"
        title={title}
        text={text}
        color={color}
        ctaShow={!!params && !!params.ctaShow && !!url}
        ctaText={(params && params.ctaText) || Strings.teaser_cta_text}
      />
    );
  }
  return content;
};

const SquareTeaser = ({
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

SquareTeaser.propTypes = {
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

export default SquareTeaser;
