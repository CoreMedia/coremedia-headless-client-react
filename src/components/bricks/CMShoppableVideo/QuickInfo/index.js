// @flow
import React from 'react';
import PropTypes from 'prop-types';
//import { injectGlobal } from 'styled-components';

import Modal from './Modal';
import Picture from '../../CMPicture';
import { Button } from '../../../basic/Button';
import { P } from '../../../basic/Paragraph';
import CloseButton from './CloseButton';
import Title from './Title';
import ContentBox from './ContentBox';
import ProductInfo from './ProductInfo';
import ProductBox from './ProductBox';
import H3 from './H3';

/*injectGlobal`
  .ReactModal__Body--open {
    overflow: hidden;
  }
`;*/

type Props = {
  item: ?Object,
  handleClose: (ev: SyntheticEvent<HTMLButtonElement>) => void,
};

const QuickInfo = ({ item, handleClose }: Props) => (
  <Modal isOpen={!!item} contentLabel="Minimal Modal Example" onRequestClose={handleClose}>
    <CloseButton handleClick={handleClose} />
    {item && (
      <ContentBox>
        <Title>{item.teaserTitle}</Title>
        <ProductBox>
          <Picture
            link={item.pictureLink}
            ratio="quickview_ratio5x6"
            title={item.pictureTitle}
            alt={item.pictureAlt}
          />
          <ProductInfo>
            <P>{item.teaserText}</P>
            <H3>{`${item.teaserTitle} EUR ${item.price}`}</H3>
            <Button>order</Button>
          </ProductInfo>
        </ProductBox>
      </ContentBox>
    )}
  </Modal>
);

QuickInfo.propTypes = {
  item: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
};

export default QuickInfo;
