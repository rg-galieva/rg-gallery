import { getNode } from '../../helpers/domHelper';
import logger from '../logger/logger';

export const openLightbox = overlayId => (ev = {}) => {
  try {
    const fullImgSrc = ev.target && ev.target.src;

    const lightboxNode = getNode(`#${overlayId}`);
    if (!lightboxNode) return;

    lightboxNode.classList.remove('is-hidden');

    const img = lightboxNode.querySelector('img');
    img.src = fullImgSrc;
  } catch (e) {
    logger('openLightbox: ', e);
  }
};

export const closeLightbox = overlayId => () => {
  try {
    const lightboxNode = document.getElementById(overlayId);
    lightboxNode.classList.add('is-hidden');
  } catch (e) {
    logger('closeLightbox: ', e);
  }
}
