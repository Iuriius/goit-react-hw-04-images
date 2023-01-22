import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ toggleModal, url }) {
  useEffect(() => {
    const keydown = event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, [toggleModal]);

  const clickOut = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={clickOut}>
      <div className="Modal">
        <img src={url} alt="this is a large img" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  url: PropTypes.string,
};
