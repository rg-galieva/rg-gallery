import { getNode } from '../../helpers/domHelper';
import logger from '../logger/logger';

export const DEFAULT_SETTINGS = {
  selectors: {
    template: '#lightbox',
    gallery: '#gallery',
    overlay: '#overlay',
    loader: '#content',
    closeBtn: '#lightboxClose',
    prevBtn: '#lightboxPrev',
    nextBtn: '#lightboxNext',
  },
};

export const openLightbox = lightboxSelector => (ev = {}) => {
  try {
    const fullImgSrc = ev.target && ev.target.src;

    const lightboxNode = getNode(lightboxSelector);
    if (!lightboxNode) return;

    lightboxNode.classList.remove('is-hidden');

    const img = lightboxNode.querySelector('img');
    img.src = fullImgSrc;
  } catch (e) {
    logger('openLightbox: ', e);
  }
};

export const closeLightbox = overlaySelector => () => {
  try {
    const lightboxNode = getNode(overlaySelector);
    lightboxNode.classList.add('is-hidden');
  } catch (e) {
    logger('closeLightbox: ', e);
  }
};
