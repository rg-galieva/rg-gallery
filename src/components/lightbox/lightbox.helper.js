import { getNode } from '../../helpers/domHelper';
import logger from '../logger/logger';

export const DEFAULT_SETTINGS = {
  selectors: {
    template: '#lightbox',
    gallery: '#gallery',
    overlay: '#overlay',
    loader: '#content',
    lightboxImg: '#lightboxFullImg',
    closeBtn: '#lightboxClose',
    prevBtn: '#lightboxPrev',
    nextBtn: '#lightboxNext',
  },
};

export const updateLightboxImg = (lightboxImgSelector, fullImgSrc, activeId) => {
  try {
    const lightboxImg = getNode(lightboxImgSelector);
    if (!lightboxImg) return;

    lightboxImg.src = fullImgSrc;
    lightboxImg.setAttribute('data-id', activeId);
  } catch (e) {
    logger('updateLightboxImg', e);
  }
};

export const openLightbox = (lightboxSelector, lightboxImgSelector) => (ev = {}) => {
  try {
    if (!ev.target) return;

    const fullImgSrc = ev.target.src;
    const activeId = ev.target.getAttribute('data-id');

    const lightboxNode = getNode(lightboxSelector);
    if (!lightboxNode) return;

    lightboxNode.classList.remove('is-hidden');

    updateLightboxImg(lightboxImgSelector, fullImgSrc, activeId);
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

// ToDo: decide what to show if prev image is unavailable
export const handlePrevNextClick = (lightboxImgSelector, isPrev) => () => {
  try {
    const lightboxImgNode = getNode(lightboxImgSelector);
    const prevActiveId = lightboxImgNode.getAttribute('data-id');

    let activeId;

    if (isPrev) {
      if (prevActiveId < 1) return;
      activeId = +prevActiveId - 1;
    } else {
      activeId = +prevActiveId + 1;
    }

    const newImg = getNode(`[data-id="${activeId}"]`);
    if (!newImg) return;

    updateLightboxImg(lightboxImgSelector, newImg.src, activeId);
  } catch (e) {
    logger('handlePrevNextClick: ', e);
  }
};
