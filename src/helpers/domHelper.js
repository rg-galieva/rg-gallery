import logger from '../components/logger/logger';


export const cloneTemplate = (templateSelector, parentSelector) => {
  if ('content' in document.createElement('template')) {
    try {
      const template = document.querySelector(templateSelector);
      const templateCopy = document.importNode(template.content, true);

      const parentNode = document.querySelector(parentSelector);
      parentNode.appendChild(templateCopy);

      return parentNode;
    } catch (e) {
      logger('cloneTemplate error: ', e);
      return null;
    }
  }

  // ToDo: support older browsers
  logger('cloneTemplate error: template tag is not supported');
  return null;
};


export const getNode = (nodeSelector) => {
  if (!nodeSelector) {
    logger('getNode: nodeSelector is required');
    return null;
  }

  const galleryNode = document.querySelector(nodeSelector);

  if (!galleryNode) {
    logger(`getNode: node for nodeSelector: ${nodeSelector} was not found`);
    return null;
  }

  return galleryNode;
};
