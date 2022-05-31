import React from "react";
import styled from "styled-components";
import Link from "../Link/Link";

interface Props {
  linkTarget: any;
  text?: string;
  additionalClass?: string;
  openInNewTab?: boolean;
  externalLink?: boolean;
}

const StyledButton = styled(Link)`
  display: inline-block;
  position: relative;
  text-decoration: none;
  color: #000;
  background-color: var(--color-green-highlight);
  border-radius: 0;
  pointer-events: auto;
  text-transform: uppercase;
  padding: 10px 20px 5px;
  transition: all 0.1s ease;
  font-size: var(--font-size-heading-3);
  font-family: var(--font-family-headline);
  &:hover {
    background-color: var(--color-green-highlight-hover);
    color: var(--color-font-cta-hover);
  }

  &:active,
  &:focus {
    outline: none;
    background-color: var(--color-green-highlight-active);
    box-shadow: inset 0 0 0 1px #fff, inset 0 0 0 2px #000;
  }

  & + & {
    margin-left: 5px;
  }
`;

export const CMButton = styled.div`
  font-family: var(--font-family-text);
  font-size: var(--font-size-text-small);
  line-height: 1.428571429;
  cursor: pointer;
  text-decoration: none;
  background-color: hsla(0, 0%, 100%, 0.75);
  border: none;
  border-radius: 0;
  &:hover {
    background-color: #fff;
  }
  &:active,
  &:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 1px hsla(0, 0%, 100%, 0.75), inset 0 0 0 2px #000;
  }
`;

const Button: React.FC<Props> = ({ linkTarget, text, additionalClass, openInNewTab = false, externalLink = false }) => {
  text = text ? text : "Read more"; //todo add i18n
  return (
    <StyledButton
      to={linkTarget}
      className={additionalClass}
      role={"button"}
      openInNewTab={openInNewTab}
      externalLink={externalLink}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
