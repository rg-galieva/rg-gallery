import { getNode } from '../../helpers/domHelper';
import logger from '../logger/logger';

export const LIGHTBOX_DEFAULT_SETTINGS = {
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

export const getLightboxControlNodes = (lightboxNode, closeBtn, prevBtn, nextBtn) => ({
  closeBtnNode: lightboxNode.querySelector(closeBtn),
  prevBtnNode: lightboxNode.querySelector(prevBtn),
  nextBtnNode: lightboxNode.querySelector(nextBtn),
});


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

    if (ev.target.tagName !== 'IMG') {
      return;
    }

    const fullImgSrc = ev.target.src;
    const activeId = ev.target.getAttribute('data-id');

    const lightboxNode = getNode(lightboxSelector);
    if (!lightboxNode) return;

    lightboxNode.classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

    updateLightboxImg(lightboxImgSelector, fullImgSrc, activeId);
  } catch (e) {
    logger('openLightbox: ', e);
  }
};

export const closeLightbox = overlaySelector => () => {
  try {
    const lightboxNode = getNode(overlaySelector);
    document.body.classList.remove('no-scroll');
    lightboxNode.classList.add('is-hidden');
  } catch (e) {
    logger('closeLightbox: ', e);
  }
};

export const getFirstAndLastImageId = (gallerySelector) => {
  try {
    const visibleImages = document.querySelectorAll(`${gallerySelector} [data-id]`);
    if (!visibleImages) return null;

    return {
      firstId: Number(visibleImages[0].dataset.id),
      lastId: Number(visibleImages[visibleImages.length - 1].dataset.id),
    };
  } catch (e) {
    logger('getFirstAndLastImageId', e);
    return null;
  }
};


export const handlePrevNextClick = (lightboxImgSelector, gallerySelector, isPrev) => () => {
  try {
    const lightboxImgNode = getNode(lightboxImgSelector);
    const prevActiveId = Number(lightboxImgNode.getAttribute('data-id'));
    const { firstId, lastId } = getFirstAndLastImageId(gallerySelector);

    let activeId;

    if (isPrev) {
      activeId = prevActiveId <= firstId ? lastId : prevActiveId - 1;
    } else {
      activeId = prevActiveId >= lastId ? firstId : prevActiveId + 1;
    }

    const newImg = getNode(`[data-id="${activeId}"]`);
    if (!newImg) return;

    updateLightboxImg(lightboxImgSelector, newImg.src, activeId);
  } catch (e) {
    logger('handlePrevNextClick: ', e);
  }
};
