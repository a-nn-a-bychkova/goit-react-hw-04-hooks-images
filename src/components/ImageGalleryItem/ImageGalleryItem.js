import React, { Component } from 'react';
import api from '../../services/images-api';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallPicture, largePicture, alt }) => {
  return (
    <li className={s.item}>
      <img
        src={smallPicture}
        alt={alt}
        className={s.image}
        data-url={largePicture}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallPicture: PropTypes.string.isRequired,
  largePicture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
