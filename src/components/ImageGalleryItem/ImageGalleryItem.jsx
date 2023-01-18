import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  const setUrl = () => {
    onClick(largeImageURL);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt="this is a small img"
        onClick={setUrl}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
