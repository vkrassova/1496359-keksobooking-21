"use strict";

(() => {
    const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const POST_URL = `https://21.javascript.pages.academy/keksobooking`;
    const StatusCode = {
      OK: 200
    };

    const TIMEOUT_IN_MS = 10000;

    const sendXhrRequest = (method, onLoad, onError, data = null) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, () => {
        if (xhr.status === StatusCode.OK) {
          if (method === POST_URL) {
            onLoad(xhr.response);
          } else {
            onLoad();
          }
        } else {
          onError(xhr.status);
        }
      });

      xhr.addEventListener(`error`, () => {
        onError(`Ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, () => {
        onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      if (method === POST_URL) {
        xhr.open(method, url.GET);
      } else if (method === DATA_URL) {
        xhr.open(method, DATA_URL);
      }

      xhr.send(data);
    };

    const load = (onLoad, onError) => {
      sendXhrRequest(POST_URL, onLoad, onError);
    };

    const save = (onLoad, onError, data) => {
      sendXhrRequest(DATA_URL, onLoad, onError, data);
    };

    window.loading = {
      load,
      save,
  };

})();
