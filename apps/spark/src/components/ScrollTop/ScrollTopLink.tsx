import React from "react";
import { HashLink } from "react-router-hash-link";
import { useTranslation } from "react-i18next";

interface Props {
  text?: string;
}

/**
 * Link component that scroll the page to top.
 *
 * @param text optional text for the link
 * @constructor
 */
const ScrollTopLink: React.FC<Props> = ({ text }) => {
  const { t } = useTranslation();
  return <HashLink to="#">{text || t("ScrollTopLink.text")}</HashLink>;
};

export default ScrollTopLink;
