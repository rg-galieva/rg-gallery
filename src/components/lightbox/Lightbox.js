import AppError from '../appError/AppError';
import logger from '../logger/logger';

const ERROR_ID = 'initLightboxError';

const initLightbox = ({ galleryNodeId, openLightboxcallback, closeLightboxCallBack }) => ({
  init: () => {
    const error = AppError(ERROR_ID, 'Gallery is not initialized');
    const galleryNode = document.getElementById(galleryNodeId);

    if (!galleryNode) {
      logger('Lightbox init: no galleryNode');
      error.init();
      return;
    }

    galleryNode.addEventListener('click', openLightboxcallback);

    if ('content' in document.createElement('template')) {
      const lightboxTemplate = document.querySelector('#lightbox');
      const lightboxTemplateCopy = document.importNode(lightboxTemplate.content, true);

      const lightboxNode = document.getElementById('overlay');
      lightboxNode.appendChild(lightboxTemplateCopy);

      const closeBtn = lightboxNode.querySelector('#lightboxClose');
      closeBtn.addEventListener('click', closeLightboxCallBack);
    } else {
      // ToDo: support older browsers
      logger('AppError initError: template tag - support older browsers');
    }
  },
});

// ToDo: remove closeLightboxCallBack listener
const unmountLightbox = ({ galleryNodeId, openLightboxcallback }) => ({
  unmount: () => {
    const error = AppError(ERROR_ID, 'Gallery is not initialized');
    const galleryNode = document.getElementById(galleryNodeId);

    if (!galleryNode) {
      logger('Lightbox init: no galleryNode');
      error.init();
      return;
    }

    galleryNode.removeEventListener('click', openLightboxcallback);
  },
});

const openFullImage = (ev = {}) => {
  const fullImgSrc = ev.target && ev.target.src;
  if (!fullImgSrc) return;

  const lightboxNode = document.getElementById('overlay');
  lightboxNode.classList.remove('is-hidden');
  const img = lightboxNode.querySelector('img');
  img.src = fullImgSrc;
};

const closeLightbox = () => {
  const lightboxNode = document.getElementById('overlay');
  lightboxNode.classList.add('is-hidden');
};

const Lightbox = (galleryNodeId, wrapperId) => {
  const state = {
    galleryNodeId,
    wrapperId,
    openLightboxcallback: openFullImage,
    closeLightboxCallBack: closeLightbox,
  };

  return Object.assign(
    state,
    initLightbox(state),
    unmountLightbox(state),
  );
};


export default Lightbox;
