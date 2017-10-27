import React from "react";
import styled from "styled-components";

import Picture from "../CMPicture";
import CTA from "../CTA";
import OptionalLink from "../Common/OptionalLink";
import Strings from "../../../l18n";
import getColors from "../../../styles/colors";
import {H2, P, TeaserBox} from "../../../styles";

const PictureBox = styled.div`
  width: 100%;
  @media only screen and (min-width: 48em) {
    width: 50%;
  }
`;
PictureBox.displayName = 'WideTeaserPictureBox';

const TextBox = styled.div`
  color: ${props => props.colors.fg};
  background-color: ${props => props.colors.bgsolid};
  text-align: center;
  @media only screen and (min-width: 48em) {
    position: absolute;
    width: 50%;
    height: 100%;
    left: 50%;
    top: 0%;
  }
`;
TextBox.displayName = 'WideTeaserTextBox';

const TextBoxWrapper = styled.div`
  padding: 2rem;
  @media only screen and (min-width: 48em) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;
TextBoxWrapper.displayName = 'WideTeaserTextBoxWrapper';

const Headline = H2.extend`
  padding: 0;
`;
Headline.displayName = 'WideTeaserHeadline';

const Text = P.extend`
  margin-top: 1em;
  padding: 0;
`;
Text.displayName = 'WideTeaserText';

const composeContent = (url, pictureLink: string, pictureTitle: string, pictureAlt: string, title?: string, text?: string, params?: any) => {
  const colors = getColors(params.color);
  const content = [];
  if (pictureLink) {
    content.push(
      <PictureBox key="picturebox">
        <Picture key="picture"
                 link={pictureLink}
                 ratio="landscape_ratio3x2"
                 title={pictureTitle}
                 alt={pictureAlt}
                 colors={colors}
        />
      </PictureBox>
    );
  }
  if (title || text || params.ctaShow) {
    content.push(
      <TextBox key="textbox" colors={colors}>
        <TextBoxWrapper>
          {title && <Headline>{title}</Headline>}
          {text && <Text dangerouslySetInnerHTML={{__html: text}}/>}
          {params.ctaShow && !!url && (<CTA text={params.ctaText ? params.ctaText : Strings.teaser_cta_text}/>)}
        </TextBoxWrapper>
      </TextBox>
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

const WideTeaser = ({url, pictureLink, pictureTitle, pictureAlt, title, text, params = {},}: Props) => {
  return (
    <OptionalLink url={url}>
      <TeaserBox>
        {composeContent(url, pictureLink, pictureTitle, pictureAlt, title, text, params)}
      </TeaserBox>
    </OptionalLink>
  );
};

export default WideTeaser;
