"use strict";

(() => {
  const setErrorsMessage = (errorStatus) => {
    const ERRORS_MESSAGE = `Пожалуйста, перегрузите страницу`;
    let error;

    switch (errorStatus) {
      case 400:
        error = `Неверный запрос. ${ERRORS_MESSAGE}`;
        break;
      case 401:
        error = `Пользователь не авторизован.`;
        break;
      case 403:
        error = `Доступ запрещен.`;
        break;
      case 404:
        error = `Ничего не найдено.`;
        break;
      default:
        error = `${errorStatus}. ${ERRORS_MESSAGE}`;
    }

    return error;
  };

  const renderErrorsNode = (errorMessage) => {
    const errorNode = document.createElement(`div`);
    errorNode.classList.add(`error`, `error-message`);
    errorNode.textContent = setErrorsMessage(errorMessage);
    document.body.insertAdjacentElement(`afterbegin`, errorNode);
  };

  window.errors = {
    renderErrorsNode,
    setErrorsMessage
  };
})();