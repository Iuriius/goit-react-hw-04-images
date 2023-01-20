import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal() {
  useEffect(() => {
    const keydown = event => {
      if (event.code === 'Escape') {
        this.props.toggleModal();
      }
    };
    window.addEventListener('keydown', this.keydown);
  });

  const clickOut = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
    window.removeEventListener('keydown', this.keydown);
  };

  return createPortal(
    <div className="Overlay" onClick={clickOut}>
      <div className="Modal">
        <img src={this.props.url} alt="this is a large img" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  url: PropTypes.string,
};
