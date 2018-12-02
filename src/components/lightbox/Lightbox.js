import { cloneTemplate, getNode } from '../../helpers/domHelper';
import { openLightbox, closeLightbox } from './lightbox.helper';
import logger from '../logger/logger';


const initLightbox = ({
  galleryId, overlayId, openLightboxCallback, closeLightboxCallback,
}) => ({
  init: () => {
    try {
      const galleryNode = getNode(`#${galleryId}`);
      if (!galleryNode) return;

      const lightboxNode = cloneTemplate('#lightbox', `#${overlayId}`);
      if (!lightboxNode) return;

      galleryNode.addEventListener('click', openLightboxCallback);

      const closeBtn = lightboxNode.querySelector('#lightboxClose');
      closeBtn.addEventListener('click', closeLightboxCallback);
    } catch (e) {
      logger('initLightbox', e);
    }
  },
});


const unmountLightbox = ({
  galleryId, overlayId, openLightboxCallback, closeLightboxCallback,
}) => ({
  unmount: () => {
    try {
      const galleryNode = getNode(`#${galleryId}`);

      if (galleryNode) {
        galleryNode.removeEventListener('click', openLightboxCallback);
      }

      const lightboxNode = getNode(`#${overlayId}`);
      if (!lightboxNode) return;

      const closeBtn = lightboxNode.querySelector('#lightboxClose');

      if (closeBtn) {
        closeBtn.removeEventListener('click', closeLightboxCallback);
      }
    } catch (e) {
      logger('unmountLightbox', e);
    }
  },
});

const Lightbox = (galleryId = 'gallery', loaderId = 'content', overlayId = 'overlay') => {
  const state = {
    galleryId,
    loaderId,
    overlayId,
    openLightboxCallback: openLightbox(overlayId),
    closeLightboxCallback: closeLightbox(overlayId),
  };

  return Object.assign(
    state,
    initLightbox(state),
    unmountLightbox(state),
  );
};


export default Lightbox;
