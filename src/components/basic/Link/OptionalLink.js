// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';

type Props = {
  url?: string,
  children: React.Node,
};

const OptionalLink = ({ url, children }: Props) => {
  return url ? <Link url={url}>{children}</Link> : children;
};

OptionalLink.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default OptionalLink;
