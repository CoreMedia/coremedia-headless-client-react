// @flow
import React from 'react';
import PropTypes from 'prop-types';

import CTA from '../../CTA';
import Box from './Box';
import FixedBox from './FixedBox';
import Headline from './Headline';
import Text from './Text';
import TextBox from './TextBox';

type Props = {
  fixed?: boolean,
  width: number,
  height: string,
  bottom: string,
  title?: string,
  text?: string,
  color?: string,
  ctaShow: boolean,
  ctaText?: string,
};

const Overlay = ({
  fixed = true,
  width,
  height,
  bottom,
  title,
  text,
  color,
  ctaShow,
  ctaText,
}: Props) => {
  const textBox = (
    <TextBox>
      {title && <Headline>{title}</Headline>}
      {text && <Text dangerouslySetInnerHTML={{ __html: text }} />}
      {ctaShow && ctaText && <CTA text={ctaText} />}
    </TextBox>
  );
  return fixed ? (
    <FixedBox width={width} height={height} bottom={bottom} color={color}>
      {textBox}
    </FixedBox>
  ) : (
    <Box width={width} height={height} bottom={bottom} color={color}>
      {textBox}
    </Box>
  );
};

Overlay.propTypes = {
  fixed: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.string.isRequired,
  bottom: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  ctaShow: PropTypes.bool,
  ctaText: PropTypes.string,
};

export default Overlay;
