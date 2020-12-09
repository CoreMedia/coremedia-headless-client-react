// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  url: string,
  children: React.Node,
};

const Link = ({ url, children }: Props) => {
  return <a href={url}>{children}</a>;
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
