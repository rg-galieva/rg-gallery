import AppError from '../appError/AppError';
import logger from '../logger/logger';
import { fetchImagesForDogs } from '../../services/imageService/imageService';

import Thumbnail from '../thumbnail/Thumbnail';

import styles from './gallery.css';


const initGallery = galleryNodeId => ({
  init: async () => {
    let galleryNode = document.getElementById(galleryNodeId);

    // create gallery wrapper if for some reason a node is missing
    if (!galleryNode) {
      galleryNode = document.createElement('section');
      galleryNode.setAttribute('id', galleryNodeId);
      document.getElementById('content').insertAdjacentElement('afterbegin', galleryNode);
    }

    const ERROR_ID = 'initGalleryError';
    const error = AppError(ERROR_ID, 'No available images');

    try {
      galleryNode.classList.add('is-loading');
      const imageList = await fetchImagesForDogs();

      for (const image of imageList) {
        const pic = {
          src: image.image,
          fullImg: image.source,
          title: 'Title',
        };

        galleryNode.insertAdjacentHTML('beforeend', Thumbnail(pic, styles.galleryImage));
      }

      error.unmount();
    } catch (e) {
      logger('Gallery initGallery', e);
      error.init();
    } finally {
      galleryNode.classList.remove('is-loading');
    }
  },
});

const Gallery = (galleryNodeId) => {
  const state = {
    galleryNodeId,
  };

  return Object.assign(state, initGallery(galleryNodeId));
};


export default Gallery;
