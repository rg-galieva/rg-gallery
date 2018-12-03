import Thumbnail from '../thumbnail/Thumbnail';
import { getNode } from '../../helpers/domHelper';
import logger from '../logger/logger';

export const GALLERY_DEFAULT_SETTINGS = {
  selectors: {
    gallery: '#gallery',
    galleryParent: '#content',
  },
};

export const GALLERY_ERROR_SETTINGS = {
  id: 'galleryError',
  message: 'No available images. Please try to reload the page.',
};


export const loadImages = (galleryNode, imageList, quantity = 8, fromIndexInitial) => {
  try {
    const fromIndex = fromIndexInitial !== undefined
      ? +fromIndexInitial
      : +galleryNode.getAttribute('data-image-index');

    let tempIndex = fromIndex;

    let maxIndex = Number(fromIndex) + Number(quantity);

    if (maxIndex > imageList.length) {
      const loadMoreBtn = getNode('#content button');
      loadMoreBtn.style.display = 'none';
      maxIndex = imageList.length;
    }


    for (let curIndex = fromIndex; curIndex < maxIndex; curIndex++) {
      const img = new Image();
      const imageProps = imageList[curIndex];

      img.onload = () => {
        const pic = {
          id: tempIndex,
          src: imageProps.image,
          fullImg: imageProps.source,
          title: '',
        };

        const newImageNode = document.createElement('div');
        newImageNode.classList.add('gallery-image');
        newImageNode.innerHTML = Thumbnail(pic);


        if (fromIndex === 0) {
          const placeholder = getNode(`[data-id="${tempIndex}"]`);
          galleryNode.replaceChild(newImageNode, placeholder);
        } else {
          galleryNode.insertAdjacentElement('beforeend', newImageNode);
        }

        tempIndex += 1;
      };

      img.src = imageProps.image;
    }

    galleryNode.setAttribute('data-image-index', maxIndex.toString());
  } catch (e) {
    logger('loadImages', e);
  }
};
