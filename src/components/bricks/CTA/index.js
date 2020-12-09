// @flow
import React from 'react';
import PropTypes from 'prop-types';

import { Button, LinkButton } from './Button';

type Props = {
  url?: string,
  text: string,
};

const CTA = ({ url, text }: Props) =>
  url && url.length > 0 ? <LinkButton href={url}>{text}</LinkButton> : <Button>{text}</Button>;

CTA.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default CTA;
