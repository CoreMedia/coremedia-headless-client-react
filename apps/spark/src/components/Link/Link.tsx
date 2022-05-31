import React from "react";
import { Link as ReactLink } from "react-router-dom";

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

const Link: React.FC<LinkProps> = ({
  to,
  className,
  role,
  children,
  title,
  openInNewTab = false,
  externalLink = false,
}) => {
  if (to === undefined || to === "") {
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
    <ReactLink className={className} to={to} role={role} title={title}>
      {children}
    </ReactLink>
  );
};
export default Link;
