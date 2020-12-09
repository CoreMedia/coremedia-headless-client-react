import React from "react";
import Link from "../Link/Link";
import "./Button.scss";

interface Props {
  linkTarget: any;
  text?: string;
  openInNewTab?: boolean;
  blockClass?: string;
  additionalClass?: string;
}

const Button: React.FC<Props> = ({ linkTarget, text, blockClass, additionalClass }) => {
  text = text ? text : "Read more";
  return (
    <Link
      to={linkTarget}
      className={`cm-cta__button ${blockClass !== undefined ? blockClass : " cm-cta-button"} ${
        additionalClass !== undefined ? additionalClass : ""
      }`}
      role={"button"}
    >
      {text}
    </Link>
  );
};

export default Button;
