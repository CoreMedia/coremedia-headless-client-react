// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import Title from '../Title';
import Abstract from '../Abstract';
import Picture from '../../CMPicture';
import Richtext from '../../Richtext';
import type { FragmentParams } from '../../../../types';

type Props = {
  pictureLink?: string,
  pictureTitle?: string,
  pictureAlt?: string,
  title?: string,
  text?: string,
  teaserText?: string,
  params?: FragmentParams,
};

const composeContent = ({
  pictureLink,
  pictureTitle,
  pictureAlt,
  title,
  text,
  teaserText,
  params,
}: Props): React.Node => {
  const color = params && params.color;
  const content = [];
  if (title) {
    content.push(<Title key="title">{title}</Title>);
  }
  if (pictureLink) {
    content.push(
      <Picture
        key="picture"
        link={pictureLink}
        ratio="landscape_ratio4x1"
        title={pictureTitle}
        alt={pictureAlt}
        color={color}
        stretch
      />
    );
  }
  if (teaserText) {
    content.push(
      <Abstract key="abstract" color={color} dangerouslySetInnerHTML={{ __html: teaserText }} />
    );
  }
  if (text) {
    content.push(<Richtext key="text" text={text} color={color} />);
  }
  return content;
};

const DetailArticle = ({
  pictureLink,
  pictureTitle,
  pictureAlt,
  title,
  text,
  teaserText,
  params = {},
}: Props) =>
  composeContent({ pictureLink, pictureTitle, pictureAlt, title, text, teaserText, params });

DetailArticle.propTypes = {
  pictureLink: PropTypes.string,
  pictureTitle: PropTypes.string,
  pictureAlt: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  teaserText: PropTypes.string,
  params: PropTypes.shape({
    color: PropTypes.string,
  }),
};

export default DetailArticle;
