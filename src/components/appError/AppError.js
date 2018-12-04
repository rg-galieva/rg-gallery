import { cloneTemplate } from '../../helpers/domHelper';
import logger from '../logger/logger';

import './appError.css';

const showError = ({ id, message, settings: { templateId } = {} }) => ({
  show: () => {
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
      logger('showError', e);
    }
  },
});

const removeError = id => ({
  remove: () => {
    try {
      const errorNode = document.getElementById(id);
      if (!errorNode) return;

      document.body.removeChild(errorNode);
    } catch (e) {
      // ToDo: throw an Error and handle it in a caller function. For now simply log and continue
      logger('removeError', e);
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
    showError(state),
    removeError(id),
    clearAllErrors(),
  );
};

export default AppError;
