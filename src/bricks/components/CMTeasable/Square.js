import React from "react";

import Picture from "../CMPicture";
import Overlay from "./Overlay";
import OptionalLink from "../Common/OptionalLink";
import Strings from "../../../l18n";
import getColors from "../../../styles/colors";
import {TeaserBox} from "../../../styles";

const composeContent = (url, pictureLink: string, pictureTitle: string, pictureAlt: string, title?: string, text?: string, params?: any) => {
  const colors = getColors(params.color);
  const content = [];
  if (pictureLink) {
    content.push(
      <Picture key="picture"
               link={pictureLink}
               ratio="portrait_ratio1x1"
               title={pictureTitle}
               alt={pictureAlt}
               colors={colors}
      />
    );
  }
  if (title || text || params.ctaShow) {
    content.push(
      <Overlay key="overlay"
               width={100}
               height="45%"
               bottom="0%"
               title={title}
               text={text}
               colors={colors}
               ctaShow={params.ctaShow && !!url}
               ctaText={params.ctaText || Strings.teaser_cta_text}
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

const SquareTeaser = ({url, pictureLink, pictureTitle, pictureAlt, title, text, params = {},}: Props) => {
  return (
    <OptionalLink url={url}>
      <TeaserBox>
        {composeContent(url, pictureLink, pictureTitle, pictureAlt, title, text, params)}
      </TeaserBox>
    </OptionalLink>
  );
};

export default SquareTeaser;
