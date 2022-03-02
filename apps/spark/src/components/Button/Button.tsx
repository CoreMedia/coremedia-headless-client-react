import React from "react";
import Link from "../Link/Link";
import "./Button.scss";

interface Props {
  linkTarget: any;
  text?: string;
  blockClass?: string;
  additionalClass?: string;
  openInNewTab?: boolean;
  externalLink?: boolean;
}

const Button: React.FC<Props> = ({
  linkTarget,
  text,
  blockClass,
  additionalClass,
  openInNewTab = false,
  externalLink = false,
}) => {
  text = text ? text : "Read more"; //todo add i18n
  return (
    <Link
      to={linkTarget}
      className={`cm-cta__button ${blockClass !== undefined ? blockClass : " cm-cta-button"} ${
        additionalClass !== undefined ? additionalClass : ""
      }`}
      role={"button"}
      openInNewTab={openInNewTab}
      externalLink={externalLink}
    >
      {text}
    </Link>
  );
};

export default Button;
