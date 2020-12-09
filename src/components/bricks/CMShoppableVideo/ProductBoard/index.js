// @flow
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Transition, TransitionGroup } from 'react-transition-group';
import Media from 'react-media';

import ProductCard from '../ProductCard';
import Wrapper from './Wrapper';
import Container from './Container';
import ReloadCard from './ReloadCard';
import ReloadBox from './ReloadBox';
import ReloadButton from './ReloadButton';

type Props = {
  thumbnails: Array<Object>,
  productboardOverflow: boolean,
  handleReplay: () => void,
  handleRef: (element: ?HTMLElement) => HTMLElement | null | void,
  theme: Object,
};

const ProductBoard = ({
  thumbnails,
  productboardOverflow,
  handleReplay,
  handleRef,
  theme,
}: Props) => {
  return (
    <Fragment>
      <ReloadBox>
        <ReloadButton handleClick={handleReplay} />
      </ReloadBox>
      <Wrapper>
        <Media query={`(min-width: ${theme.breakpoints.tablet}px)`}>
          {matches =>
            matches ? (
              <TransitionGroup
                component={Container}
                innerRef={handleRef}
                productboardOverflow={productboardOverflow}
              >
                {thumbnails.map((item, index) => (
                  <Transition key={item.id} appear={true} timeout={300 + index * 200}>
                    {status => (
                      <ProductCard
                        index={index}
                        entered={status === 'entered'}
                        handleClick={item.handleClick}
                        pictureLink={item.pictureLink}
                        pictureTitle={item.pictureTitle}
                        pictureAlt={item.pictureAlt}
                        title={item.teaserTitle}
                        price={item.price}
                      />
                    )}
                  </Transition>
                ))}
              </TransitionGroup>
            ) : (
              <TransitionGroup component={Container} innerRef={handleRef}>
                {thumbnails.reverse().map((item, index) => (
                  <Transition key={item.id} appear={true} timeout={300 + index * 200}>
                    {status => (
                      <ProductCard
                        index={index + 1}
                        entered={status === 'entered'}
                        handleClick={item.handleClick}
                        pictureLink={item.pictureLink}
                        pictureTitle={item.pictureTitle}
                        pictureAlt={item.pictureAlt}
                        title={item.teaserTitle}
                        price={item.price}
                      />
                    )}
                  </Transition>
                ))}
                <ReloadCard index={0}>
                  <ReloadButton handleClick={handleReplay} />
                </ReloadCard>
              </TransitionGroup>
            )
          }
        </Media>
      </Wrapper>
    </Fragment>
  );
};

const Wrapped = withTheme(ProductBoard);

Wrapped.propTypes = {
  thumbnails: PropTypes.arrayOf(PropTypes.object).isRequired,
  productboardOverflow: PropTypes.bool.isRequired,
  handleReplay: PropTypes.func.isRequired,
  handleRef: PropTypes.func.isRequired,
};

export default Wrapped;
