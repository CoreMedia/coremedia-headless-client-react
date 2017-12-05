// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import Headline from './Headline';
import PictureBox from './PictureBox';
import Text from './Text';
import TextBox from './TextBox';
import TextBoxWrapper from './TextBoxWrapper';
import Picture from '../../CMPicture';
import CTA from '../../CTA';
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
      <PictureBox key="picturebox">
        <Picture
          key="picture"
          link={pictureLink}
          ratio="landscape_ratio3x2"
          title={pictureTitle}
          alt={pictureAlt}
          color={color}
        />
      </PictureBox>
    );
  }
  if (title || text || (params && params.ctaShow)) {
    content.push(
      <TextBox key="textbox" color={color}>
        <TextBoxWrapper>
          {title && <Headline>{title}</Headline>}
          {text && <Text dangerouslySetInnerHTML={{ __html: text }} />}
          {params &&
            params.ctaShow &&
            !!url && (
              <CTA
                text={params && params.ctaText ? params && params.ctaText : Strings.teaser_cta_text}
              />
            )}
        </TextBoxWrapper>
      </TextBox>
    );
  }
  return content;
};

const WideTeaser = ({
  url,
  pictureLink,
  pictureTitle,
  pictureAlt,
  title,
  text,
  params = {},
}: Teaser) => {
  return (
    <OptionalLink url={url}>
      <TeaserBox>
        {composeContent({ url, pictureLink, pictureTitle, pictureAlt, title, text, params })}
      </TeaserBox>
    </OptionalLink>
  );
};

WideTeaser.propTypes = {
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

export default WideTeaser;
