// @flow
import * as React from "react";
import PropTypes from "prop-types";

type Props = {
  url?: string,
  children: React.Node
};

const OptionalLink = ({url, children}: Props) => {
  return url ? <a href={url}>{children}</a> : children;
};

OptionalLink.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default OptionalLink;
