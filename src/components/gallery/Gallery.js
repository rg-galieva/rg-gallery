import AppError from '../appError/AppError';
import logger from '../logger/logger';
import { fetchImagesForDogs } from '../../services/imageService/imageService';

import Thumbnail from '../thumbnail/Thumbnail';

import styles from './gallery.pcss';


const initGallery = (galleryNodeId, wrapperId) => ({
  init: async () => {
    let galleryNode = document.getElementById(galleryNodeId);
    const wrapperNode = document.getElementById(wrapperId);

    // create gallery wrapper if for some reason a node is missing
    if (!galleryNode) {
      galleryNode = document.createElement('section');
      galleryNode.setAttribute('id', galleryNodeId);
      document.getElementById('content').insertAdjacentElement('afterbegin', galleryNode);
    }

    const ERROR_ID = 'initGalleryError';
    const error = AppError(ERROR_ID, 'No available images');

    try {
      if (wrapperNode) wrapperNode.classList.add('is-loading');
      const imageList = await fetchImagesForDogs();
      galleryNode.innerHTML = null;

      imageList.forEach((image, index) => {
        const pic = {
          id: index,
          src: image.image,
          fullImg: image.source,
          title: 'Title',
        };

        galleryNode.insertAdjacentHTML('beforeend', Thumbnail(pic, styles.galleryImage));
      });

      error.unmount();
    } catch (e) {
      logger('Gallery initGallery', e);
      error.init();
    } finally {
      if (wrapperNode) wrapperNode.classList.remove('is-loading');
    }
  },
});

const Gallery = (galleryNodeId, wrapperId) => {
  const state = {
    galleryNodeId,
    wrapperId,
  };

  return Object.assign(state, initGallery(galleryNodeId, wrapperId));
};


export default Gallery;
