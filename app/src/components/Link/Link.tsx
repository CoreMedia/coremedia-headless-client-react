import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { getLink } from "../../utils/Link/LinkUtils";

interface Props {
  to: any;
  className?: string;
  role?: string;
  title?: string;
}

export const Link: React.FC<Props> = ({ to, className, role, children, title }) => {
  const { rootSegment } = useSiteContextState();
  const linkTarget = getLink(to, rootSegment);

  return (
    <ReactLink className={className} to={linkTarget} role={role} title={title}>
      {children}
    </ReactLink>
  );
};
export default Link;
