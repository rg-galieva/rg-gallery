import { cloneTemplate, getNode } from '../../helpers/domHelper';
import { openLightbox, closeLightbox, DEFAULT_SETTINGS } from './lightbox.helper';
import logger from '../logger/logger';


const initLightbox = (props) => {
  const {
    selectors: {
      template,
      gallery,
      overlay,
      closeBtn,
    } = {},
    openLightboxCallback,
    closeLightboxCallback,
  } = props;

  return {
    init: () => {
      try {
        const galleryNode = getNode(gallery);
        if (!galleryNode) return;

        const lightboxNode = cloneTemplate(template, overlay);
        if (!lightboxNode) return;

        galleryNode.addEventListener('click', openLightboxCallback);

        const closeBtnNode = lightboxNode.querySelector(closeBtn);
        closeBtnNode.addEventListener('click', closeLightboxCallback);
      } catch (e) {
        logger('initLightbox', e);
      }
    },
  };
};


const unmountLightbox = (props) => {
  const {
    selectors: {
      gallery,
      overlay,
      closeBtn,
    } = {},
    openLightboxCallback,
    closeLightboxCallback,
  } = props;

  return {
    unmount: () => {
      try {
        const galleryNode = getNode(gallery);

        if (galleryNode) {
          galleryNode.removeEventListener('click', openLightboxCallback);
        }

        const lightboxNode = getNode(overlay);
        if (!lightboxNode) return;

        const closeBtnNode = lightboxNode.querySelector(closeBtn);

        if (closeBtnNode) {
          closeBtnNode.removeEventListener('click', closeLightboxCallback);
        }
      } catch (e) {
        logger('unmountLightbox', e);
      }
    },
  };
};


const Lightbox = (settings = DEFAULT_SETTINGS) => {
  const { selectors, selectors: { overlay } } = settings;

  const props = {
    selectors,
    openLightboxCallback: openLightbox(overlay),
    closeLightboxCallback: closeLightbox(overlay),
  };

  return Object.assign(
    props,
    initLightbox(props),
    unmountLightbox(props),
  );
};


export default Lightbox;
