import React from "react";
import { LinkProps } from "./Link";

interface externalLinkProps {
  target?: string;
  rel?: string;
}

export const ExternalLink: React.FC<LinkProps> = ({ to, className, role, children, title, openInNewTab = false }) => {
  const openInNewTabProps: externalLinkProps = {};
  if (openInNewTab) {
    openInNewTabProps["target"] = "_blank";
    openInNewTabProps["rel"] = "noreferrer noopener";
  }

  return (
    <a className={className} href={to} role={role} title={title} {...openInNewTabProps}>
      {children}
    </a>
  );
};

export default ExternalLink;
