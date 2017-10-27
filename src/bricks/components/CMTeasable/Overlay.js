// @flow
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CTA from "../CTA";
import {Box, H2, P} from "../../../styles";

const OverlayBox = styled.div`
  color: ${props => props.colors.fg};
  background-color: ${props => props.colors.bgsolid};
  position: relative;
  overflow: hidden;
  padding: 1em;
  max-width: 100%;
  max-height: 100%;
  @media only screen and (min-width: 48em) {
    background-color: ${props => props.colors.bgtrans};
    position: absolute;
    width: ${props => props.width}%;
    height: ${props => props.height};
    left: ${props => (100 - props.width) / 2}%;
    bottom: ${props => props.bottom};
  }
`;
OverlayBox.displayName = 'TeaserOverlayBox';

const FixedOverlayBox = styled.div`
  color: ${props => props.colors.fg};
  background-color: ${props => props.colors.bgtrans};
  overflow: hidden;
  padding: 1em;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  width: ${props => props.width}%;
  left: ${props => (100 - props.width) / 2}%;
  bottom: ${props => props.bottom};
  @media only screen and (min-width: 48em) {
    height: ${props => props.height};
  }
`;
FixedOverlayBox.displayName = 'FixedTeaserOverlayBox';

const OverlayTextBox = Box.extend`
  text-align: center;
  & :first-child {
    margin-top: 0.6em;
  }
  & :last-child {
    margin-bottom: 0.6em;
  }
`;
OverlayTextBox.displayName = 'TeaserOverlayTextBox';

const OverlayHeadline = H2.extend`
  padding: 0;
`;
OverlayHeadline.displayName = 'TeaserOverlayHeadline';

const OverlayText = P.extend`
  margin-top: 1em;
  padding: 0;
`;
OverlayText.displayName = 'TeaserOverlayText';

type Props = {
  fixed?: boolean,
  width: number,
  height: string,
  bottom: string,
  title?: string,
  text?: string,
  colors: any,
  ctaShow?: boolean,
  ctaText?: string
};

const TeaserOverlay = ({fixed = true, width, height, bottom, title, text, colors, ctaShow = false, ctaText}: Props) => {
  const textBox = (
    <OverlayTextBox>
      {title && <OverlayHeadline>{title}</OverlayHeadline>}
      {text && <OverlayText dangerouslySetInnerHTML={{__html: text}}/>}
      {ctaShow && <CTA text={ctaText}/>}
    </OverlayTextBox>
  );
  if (fixed) {
    return (
      <FixedOverlayBox width={width} height={height} bottom={bottom} colors={colors}>
        {textBox}
      </FixedOverlayBox>
    );
  } else {
    return (
      <OverlayBox width={width} height={height} bottom={bottom} colors={colors}>
        {textBox}
      </OverlayBox>
    );
  }
};

TeaserOverlay.propTypes = {
  fixed: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.string.isRequired,
  bottom: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  colors: PropTypes.any.isRequired,
  ctaShow: PropTypes.bool,
  ctaText: PropTypes.string
};

export default TeaserOverlay;
