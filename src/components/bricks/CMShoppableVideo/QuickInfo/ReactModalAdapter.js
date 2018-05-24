// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

type Props = {
  className: string,
  overlayClassName: string,
  modalClassName: string,
};

const ReactModalAdapter = ({ className, overlayClassName, modalClassName, ...props }: Props) => (
  <Modal
    overlayClassName={overlayClassName}
    className={modalClassName}
    portalClassName={className}
    ariaHideApp={false}
    {...props}
  />
);

ReactModalAdapter.propTypes = {
  className: PropTypes.string.isRequired,
  overlayClassName: PropTypes.shape({
    base: PropTypes.string.isRequired,
    afterOpen: PropTypes.string.isRequired,
    beforeClose: PropTypes.string.isRequired,
  }).isRequired,
  modalClassName: PropTypes.shape({
    base: PropTypes.string.isRequired,
    afterOpen: PropTypes.string.isRequired,
    beforeClose: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReactModalAdapter;
