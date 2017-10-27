// @flow
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CTAButton = styled.button`
  border: 2px solid;
  margin-top: 1em;
  padding: 0.5em 1em;
  color: inherit;
  background-color: inherit;
`;
CTAButton.displayName = 'CTAButton';

const CTALink = CTAButton.withComponent('a').extend`
  display: inline-block;
`;
CTALink.displayName = 'CTALink';

type Props = {
  url?: string,
  text: string
};

const CTA = ({url, text}: Props) => {
  if (url && url.length > 0) {
    return <CTALink href={url}>{text}</CTALink>;
  } else {
    return <CTAButton>{text}</CTAButton>;
  }
};

CTA.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default CTA;
