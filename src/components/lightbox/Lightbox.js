import { cloneTemplate, getNode } from '../../helpers/domHelper';
import {
  openLightbox,
  closeLightbox,
  handlePrevNextClick,
  getLightboxControlNodes,
  LIGHTBOX_DEFAULT_SETTINGS,
} from './lightbox.helper';
import logger from '../logger/logger';

import './lightbox.css';

const initLightbox = (props) => {
  const {
    selectors: {
      template,
      gallery,
      overlay,
      closeBtn,
      prevBtn,
      nextBtn,
    } = {},
    openLightboxCallback,
    closeLightboxCallback,
    prevClickCallback,
    nextClickCallback,
  } = props;

  return {
    init: () => {
      try {
        const galleryNode = getNode(gallery);
        if (!galleryNode) return;

        const lightboxNode = cloneTemplate(template, overlay);
        if (!lightboxNode) return;

        galleryNode.addEventListener('click', openLightboxCallback);

        const {
          closeBtnNode,
          prevBtnNode,
          nextBtnNode,
        } = getLightboxControlNodes(lightboxNode, closeBtn, prevBtn, nextBtn);

        closeBtnNode.addEventListener('click', closeLightboxCallback);
        prevBtnNode.addEventListener('click', prevClickCallback);
        nextBtnNode.addEventListener('click', nextClickCallback);
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
      prevBtn,
      nextBtn,
    } = {},
    openLightboxCallback,
    closeLightboxCallback,
    prevClickCallback,
    nextClickCallback,
  } = props;

  return {
    unmount: () => {
      try {
        const galleryNode = getNode(gallery);
        if (galleryNode) galleryNode.removeEventListener('click', openLightboxCallback);

        const lightboxNode = getNode(overlay);
        if (!lightboxNode) return;

        const {
          closeBtnNode,
          prevBtnNode,
          nextBtnNode,
        } = getLightboxControlNodes(lightboxNode, closeBtn, prevBtn, nextBtn);

        if (closeBtnNode) closeBtnNode.removeEventListener('click', closeLightboxCallback);
        if (prevBtnNode) prevBtnNode.removeEventListener('click', prevClickCallback);
        if (nextBtnNode) nextBtnNode.removeEventListener('click', nextClickCallback);
      } catch (e) {
        logger('unmountLightbox', e);
      }
    },
  };
};


const Lightbox = (settings = LIGHTBOX_DEFAULT_SETTINGS) => {
  const { selectors } = settings;

  const {
    overlay,
    lightboxImg,
    gallery,
  } = selectors;

  const props = {
    selectors,
    openLightboxCallback: openLightbox(overlay, lightboxImg),
    closeLightboxCallback: closeLightbox(overlay),
    prevClickCallback: handlePrevNextClick(lightboxImg, gallery, true),
    nextClickCallback: handlePrevNextClick(lightboxImg, gallery, false),
  };

  return Object.assign(
    props,
    initLightbox(props),
    unmountLightbox(props),
  );
};


export default Lightbox;
