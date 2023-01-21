import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydown);
  }

  keydown = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  clickOut = event => {
    if (event.target === event.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.clickOut}>
        <div className="Modal">
          <img src={this.props.url} alt="this is a large img" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  url: PropTypes.string,
};

export default Modal;
