"use strict";

(() => {

  const url = {
    POST: `https://21.javascript.pages.academy/keksobooking`,
    GET: `https://21.javascript.pages.academy/keksobooking/data`,
  };

  const StatusCode = {
    OK: 200
  };

  const sendXhrRequest = (method, onLoad, onError, data = null) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        if (method === `GET`) {
          onLoad(xhr.response);
        } else {
          onLoad();
        }
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = window.constant.TIMEOUT_IN_MS;

    if (method === `GET`) {
      xhr.open(method, url.GET);
    } else if (method === `POST`) {
      xhr.open(method, url.POST);
    }

    xhr.send(data);
  };

  const load = (onLoad, onError) => {
    sendXhrRequest(`GET`, onLoad, onError);
  };

  const save = (onLoad, onError, data) => {
    sendXhrRequest(`POST`, onLoad, onError, data);
  };

  window.loadData = {
    load,
    save,
  };
})();
