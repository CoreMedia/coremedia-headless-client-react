import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Link from "../Link/Link";

interface Props {
  linkTarget?: any;
  clickHandler?: () => void;
  text?: string;
  additionalClass?: string;
  openInNewTab?: boolean;
  externalLink?: boolean;
  primary?: boolean;
}

export const StyledButton = styled.div<{ primary?: boolean }>`
  background: ${(props) => (props.primary ? "var(--cta-primary-background)" : "var(--cta-background)")};
  border-radius: ${(props) => (props.primary ? "var(--cta-primary-border-radius)" : "var(--cta-border-radius)")};
  border: ${(props) => (props.primary ? "var(--cta-primary-border)" : "var(--cta-border)")};
  color: ${(props) => (props.primary ? "var(--cta-primary-text-color)" : "var(--cta-text-color)")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-headline);
  font-size: var(--font-size-heading-3);
  padding: 10px 20px 5px;
  pointer-events: auto;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.5s ease;

  &:hover {
    background: ${(props) => (props.primary ? "var(--cta-primary-background-hover)" : "var(--cta-background-hover)")};
    border: ${(props) => (props.primary ? "var(--cta-primary-border-hover)" : "var(--cta-border-hover)")};
    color: ${(props) => (props.primary ? "var(--cta-primary-text-color-hover)" : "var(--cta-text-color-hover)")};
  }

  &:active,
  &:focus {
    outline: none;
    background: ${(props) => (props.primary ? "var(--cta-primary-background-active)" : "var(--cta-background-active)")};
    border: ${(props) => (props.primary ? "var(--cta-primary-border-active)" : "var(--cta-border-active)")};
    color: ${(props) => (props.primary ? "var(--cta-primary-text-color-active)" : "var(--cta-text-color-active)")};
    box-shadow:
      inset 0 0 0 1px var(--cta-background-active),
      inset 0 0 0 2px var(--cta-text-color-active);
  }

  & + & {
    margin-left: 5px;
  }
`;

const Button: React.FC<Props> = ({
  linkTarget,
  clickHandler,
  text,
  additionalClass,
  openInNewTab = false,
  externalLink = false,
  primary = true,
}) => {
  const { t } = useTranslation();

  if (!text) {
    // do not show default text "read more" for media / download links
    text =
      linkTarget && linkTarget.indexOf("/caas/v1/media") === 0 ? t("Button.downloadText") : t("Button.defaultText");
  }
  return (
    <StyledButton
      as={Link}
      to={linkTarget}
      clickHandler={clickHandler}
      className={additionalClass}
      role={"button"}
      openInNewTab={openInNewTab}
      externalLink={externalLink}
      primary={primary}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
