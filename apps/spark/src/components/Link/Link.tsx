import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { getLink } from "../../utils/Link/LinkUtils";

export interface LinkAttributes {
  linkTarget?: string;
  openInNewTab?: boolean;
  externalLink?: boolean;
}

export interface LinkProps {
  to: any;
  className?: string;
  role?: string;
  title?: string;
  openInNewTab?: boolean;
  externalLink?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  to,
  className,
  role,
  children,
  title,
  openInNewTab = false,
  externalLink = false,
}) => {
  const linkTarget = getLink(to);
  if (!linkTarget.linkTarget) {
    return <>{children}</>;
  }
  // external link
  if (externalLink) {
    const openInNewTabProps: { target?: string; rel?: string } = {};
    if (openInNewTab) {
      openInNewTabProps.target = "_blank";
      openInNewTabProps.rel = "noreferrer noopener";
    }

    return (
      <a className={className} href={to} role={role} title={title} {...openInNewTabProps}>
        {children}
      </a>
    );
  }

  // internal link
  return (
    <ReactLink className={className} to={linkTarget.linkTarget} role={role} title={title}>
      {children}
    </ReactLink>
  );
};
export default Link;
