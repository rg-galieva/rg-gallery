import AppError from '../appError/AppError';
import logger from '../logger/logger';
import { getNode } from '../../helpers/domHelper';
import {
  GALLERY_ERROR_SETTINGS,
  GALLERY_DEFAULT_SETTINGS,
  loadImages,

} from './gallery.helper';

import { fetchImagesForDogs } from '../../services/imageService/imageService';

import './gallery.css';


const initGallery = (props) => {
  const {
    selectors: {
      gallery,
      galleryParent,
    } = {},
    loadImagesCallback,
  } = props;

  return {
    init: async () => {
      let galleryNode = getNode(gallery);
      const wrapperNode = getNode(galleryParent);

      // create gallery wrapper if for some reason a node is missing
      if (!galleryNode) {
        galleryNode = document.createElement('section');
        galleryNode.setAttribute('id', gallery.replace(/\W/g, ''));
        document.getElementById('content')
          .insertAdjacentElement('afterbegin', galleryNode);
      }

      const error = AppError(GALLERY_ERROR_SETTINGS.id, GALLERY_ERROR_SETTINGS.message);

      try {
        if (wrapperNode) wrapperNode.classList.add('is-loading');
        const imageList = await fetchImagesForDogs();

        const numberOfImagesPerPage = galleryNode.getAttribute('data-images');

        loadImagesCallback(galleryNode, imageList, numberOfImagesPerPage, 0);

        let loadMoreButton = document.createElement('button');
        loadMoreButton.classList.add('btn');
        loadMoreButton.innerText = 'Load more';
        loadMoreButton = galleryNode.insertAdjacentElement('afterend', loadMoreButton);

        loadMoreButton.addEventListener('click', () => loadImagesCallback(galleryNode, imageList, numberOfImagesPerPage));

        error.remove();
      } catch (e) {
        logger('initGallery', e);
        error.show();
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
    loadImagesCallback: loadImages,
  };

  return Object.assign(props, initGallery(props));
};


export default Gallery;
