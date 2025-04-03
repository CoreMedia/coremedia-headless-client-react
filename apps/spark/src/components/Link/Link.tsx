import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export interface LinkAttributes {
  linkTarget?: string;
  clickHandler?: () => void;
  openInNewTab?: boolean;
  externalLink?: boolean;
  anchor?: string;
}

export interface LinkProps {
  to: any;
  clickHandler?: () => void;
  className?: string;
  role?: string;
  title?: string;
  openInNewTab?: boolean;
  externalLink?: boolean;
  primary?: boolean;
  anchor?: string;
}

const Link: React.FC<LinkProps> = ({
  to,
  clickHandler,
  className,
  role,
  children,
  title,
  openInNewTab = false,
  externalLink = false,
  anchor,
}) => {
  // no link, but an JS click handler
  if (clickHandler) {
    return (
      <a className={className} href={to} role={role} title={title} onClick={() => clickHandler()}>
        {children}
      </a>
    );
  }

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
      <a className={className} href={to} role={role} title={title} onClick={clickHandler} {...openInNewTabProps}>
        {children}
      </a>
    );
  }

  // internal hash link
  if (anchor) {
    return (
      <HashLink className={className} to={`${to}#${anchor}`} role={role} title={title}>
        {children}
      </HashLink>
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
