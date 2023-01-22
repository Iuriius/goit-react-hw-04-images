import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

export default function ImageGallery({ images, onClick }) {
  return (
    <ul className="ImageGallery">
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.webformatURL}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  onClick: PropTypes.func,
};
