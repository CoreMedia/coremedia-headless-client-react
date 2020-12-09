// @flow
import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from './Thumbnail';
import ProgressBar from './ProgressBar';
import Container from './Container';
import Wrapper from './Wrapper';
import Box from './Box';

type Props = {
  thumbnails: Array<Object>,
  translateX: number,
  handleRef: (element: ?HTMLElement) => HTMLElement | null | void,
  prevItems: number,
  range: number,
  thumbWidth: number,
};

const ThumbnailBar = ({
  thumbnails,
  translateX,
  handleRef,
  prevItems,
  range,
  thumbWidth,
}: Props) => {
  const posX = prevItems * thumbWidth;
  const width = range * thumbWidth;

  return (
    <Wrapper>
      <Container translateX={translateX}>
        <Box innerRef={handleRef}>
          {thumbnails.map(item => (
            <Thumbnail
              key={item.id}
              active={item.active}
              ariaLabel={`Open product preview for "${item.teaserTitle}"`}
              handleClick={item.handleClick}
              pictureLink={item.pictureLink}
              pictureTitle={item.pictureTitle}
              pictureAlt={item.pictureAlt}
            />
          ))}
        </Box>
        <ProgressBar posX={posX} width={width} />
      </Container>
    </Wrapper>
  );
};

ThumbnailBar.propTypes = {
  thumbnails: PropTypes.arrayOf(PropTypes.object).isRequired,
  translateX: PropTypes.number.isRequired,
  handleRef: PropTypes.func.isRequired,
  prevItems: PropTypes.number.isRequired,
  range: PropTypes.number.isRequired,
  thumbWidth: PropTypes.number.isRequired,
};

export default ThumbnailBar;
