import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { getLink } from "../../utils/Link/LinkUtils";
import { ExternalLink } from "./ExternalLink";

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
  const { rootSegment } = useSiteContextState();

  // external link
  if (externalLink) {
    return (
      <ExternalLink className={className} to={to} role={role} title={title} openInNewTab={openInNewTab}>
        {children}
      </ExternalLink>
    );
  }

  // internal link
  const linkTarget = getLink(to, rootSegment);
  return (
    <ReactLink className={className} to={linkTarget} role={role} title={title}>
      {children}
    </ReactLink>
  );
};
export default Link;
