import logger from '../logger/logger';

const initError = ({ id, message, settings: { templateId } = {} }) => ({
  init: () => {
    if ('content' in document.createElement('template')) {
      const errorTemplate = document.querySelector(`#${templateId}`);
      const errorTemplateCopy = document.importNode(errorTemplate.content, true);

      const errorNode = document.createElement('div');
      errorNode.appendChild(errorTemplateCopy);
      errorNode.setAttribute('id', id);
      errorNode.setAttribute('data-type', 'error');

      if (message) {
        const errorMessageElement = errorNode.querySelector('p');
        errorMessageElement.innerHTML = message;
      }

      document.body.appendChild(errorNode);
    } else {
      // ToDo: support older browsers
      logger('AppError initError: template tag - support older browsers');
    }
  },
});

const unmountError = id => ({
  unmount: () => {
    try {
      const errorNode = document.getElementById(id);
      if (!errorNode) return;

      document.body.removeChild(errorNode);
    } catch (e) {
      // ToDo: throw an Error and handle it in a caller function. For now simply log and continue
      logger('AppError unmountError', e);
    }
  },
});


const clearAllErrors = () => ({
  clearAllErrors: () => {
    try {
      const errorList = document.querySelectorAll('[data-type="error"]');

      for (const errorNode of errorList) {
        document.body.removeChild(errorNode);
      }
    } catch (e) {
      // ToDo: throw an Error and handle it in a caller function. For now simply log and continue
      logger('AppError clearAllErrors', e);
    }
  },
});

const DEFAULT_SETTINGS = {
  templateId: 'globalError',
};

const AppError = (id, message, settings = DEFAULT_SETTINGS) => {
  const state = {
    id,
    message,
    settings,
  };

  return Object.assign(
    state,
    initError(state),
    unmountError(id),
    clearAllErrors(),
  );
};

export default AppError;
