// @flow
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactModalAdapter from './ReactModalAdapter';
import { media } from '../../../../styles/themes/utils';

const Modal = styled(ReactModalAdapter).attrs({
  overlayClassName: {
    base: 'cm-overlay',
    afterOpen: 'cm-overlay--after-open',
    beforeClose: 'cm-overlay--before-close',
  },
  modalClassName: {
    base: 'cm-modal',
    afterOpen: 'cm-modal--after-open',
    beforeClose: 'cm-modal--before-close',
  },
  closeTimeoutMS: 200,
})`
  .cm-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(173, 173, 173, 0.9);
    cursor: pointer;
    z-index: 99999;
    opacity: 0;
    &--after-open {
      opacity: 1;
      transition: opacity 150ms ease-out;
    }
    &--before-close {
      opacity: 0;
      transition: opacity 150ms ease-in;
    }
  }
  .cm-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing: content-box;
    cursor: default;
    z-index: 99999;
    transform: scale(0.5);
    &--after-open {
      transform: scale(1);
      transition: all 150ms ease-out;
    }
    &--before-close {
      transform: scale(0.5);
      transition: all 150ms ease-in;
    }
    ${props => media(props.theme.breakpoints.tablet)`
      top: 50%;
      left: 50%;
      width: 550px;
      height: auto;
      min-height: 365px;
      transform: translate(-50%, -50%) scale(0.5);
      box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.32);
      &--after-open {
        transform: translate(-50%, -50%) scale(1);
        transition: all 150ms ease-out;
      }
      &--before-close {
        transform: translate(-50%, -50%) scale(0.5);
        transition: all 150ms ease-in;
      }
    `};
  }
`;

Modal.displayName = 'Modal';

Modal.propTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.shape({
      tablet: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

Modal.defaultProps = {
  theme: {
    breakpoints: {
      tablet: 768,
    },
  },
};

export default Modal;
