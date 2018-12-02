import AppError from '../appError/AppError';
import logger from '../logger/logger';
import { getNode } from '../../helpers/domHelper';
import { GALLERY_ERROR_SETTINGS, GALLERY_DEFAULT_SETTINGS } from './gallery.helper';

import { fetchImagesForDogs } from '../../services/imageService/imageService';

import Thumbnail from '../thumbnail/Thumbnail';

import styles from './gallery.pcss';


const initGallery = (props) => {
  const {
    selectors: {
      gallery,
      galleryParent,
    } = {},
  } = props;

  return {
    init: async () => {
      let galleryNode = getNode(gallery);
      const wrapperNode = getNode(galleryParent);

      // create gallery wrapper if for some reason a node is missing
      if (!galleryNode) {
        galleryNode = document.createElement('section');
        galleryNode.setAttribute('id', gallery.replace(/\W/g, ''));
        document.getElementById('content').insertAdjacentElement('afterbegin', galleryNode);
      }

      const error = AppError(GALLERY_ERROR_SETTINGS.id, GALLERY_ERROR_SETTINGS.message);

      try {
        if (wrapperNode) wrapperNode.classList.add('is-loading');
        const imageList = await fetchImagesForDogs();
        galleryNode.innerHTML = null;

        imageList.forEach((image, index) => {
          const pic = {
            id: index,
            src: image.image,
            fullImg: image.source,
            title: '',
          };

          galleryNode.insertAdjacentHTML('beforeend', Thumbnail(pic, styles.galleryImage));
        });

        error.unmount();
      } catch (e) {
        logger('initGallery', e);
        error.init();
      } finally {
        if (wrapperNode) wrapperNode.classList.remove('is-loading');
      }
    },
  };
};

const Gallery = (settings = GALLERY_DEFAULT_SETTINGS) => {
  const { selectors } = settings;

  const props = {
    selectors,
  };

  return Object.assign(props, initGallery(props));
};


export default Gallery;
