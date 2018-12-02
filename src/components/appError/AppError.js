import { cloneTemplate } from '../../helpers/domHelper';
import logger from '../logger/logger';

import './appError.css';

const initError = ({ id, message, settings: { templateId } = {} }) => ({
  init: () => {
    try {
      const errorNode = cloneTemplate(`#${templateId}`);

      errorNode.setAttribute('id', id);
      errorNode.setAttribute('data-type', 'error');

      if (message) {
        const errorMessageElement = errorNode.querySelector('p');
        errorMessageElement.innerHTML = message;
      }

      document.body.appendChild(errorNode);
    } catch (e) {
      logger('initError', e);
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
      logger('unmountError', e);
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
