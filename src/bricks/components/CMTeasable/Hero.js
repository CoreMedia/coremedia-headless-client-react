// @flow
import React from "react";
import PropTypes from "prop-types";

import Picture from "../CMPicture";
import Overlay from "./Overlay";
import OptionalLink from "../Common/OptionalLink";
import Strings from "../../../l18n";
import getColors from "../../../styles/colors";
import {TeaserBox} from "../../../styles";

const composeContent = (url:string, pictureLink: string, pictureTitle: string, pictureAlt: string, title?: string, text?: string, params?: any) => {
  const colors = getColors(params.color);
  const content = [];
  if (pictureLink) {
    content.push(
      <Picture key="picture"
               link={pictureLink}
               ratio="landscape_ratio16x9"
               title={pictureTitle}
               alt={pictureAlt}
               colors={colors}
      />
    );
  }
  if (title || text || params.ctaShow) {
    content.push(
      <Overlay key="overlay"
               fixed={false}
               width={70}
               height="auto"
               bottom="5%"
               title={title}
               text={text}
               colors={colors}
               ctaShow={params.ctaShow && !!url}
               ctaText={params.ctaText || Strings.hero_cta_text}
      />
    );
  }
  return content;
};

type Props = {
  url?: string,
  pictureLink?: string,
  pictureTitle?: string,
  pictureAlt?: string,
  title?: string,
  text?: string,
  params?: any
};

const Hero = ({url, pictureLink, pictureTitle, pictureAlt, title, text, params = {},}: Props) => {
  return (
    <OptionalLink url={url}>
      <TeaserBox>
        {composeContent(url, pictureLink, pictureTitle, pictureAlt, title, text, params)}
      </TeaserBox>
    </OptionalLink>
  );
};

Hero.propTypes = {
  url: PropTypes.string,
  pictureLink: PropTypes.string,
  pictureTitle: PropTypes.string,
  pictureAlt: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  params: PropTypes.any
};

export default Hero;
