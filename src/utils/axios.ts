import axios from 'axios';
import { devConsoleError, devConsoleLog } from './logging';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.request.use(
  function (config) {
    devConsoleLog(
      `REQUEST : ${config.url}\n\nJSON : ${JSON.stringify(config)}`
    );

    return config;
  },
  function (error) {
    devConsoleLog(`API request error : ${JSON.stringify(error)}`);

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    devConsoleLog(
      `[${response.status}] RESPONSE : ${
        response.config.url
      } \n\nJSON : ${JSON.stringify(response)}`
    );

    return response;
  },
  function (error) {
    if (error.response) {
      devConsoleError(`API response error : ${JSON.stringify(error.response)}`);
    } else {
      devConsoleError(`API response error : ${JSON.stringify(error)}`);
    }

    return Promise.reject({
      name: error.name,
      message: error.response?.data.Message,
      code: error.response?.status?.toString(),
      stack: error.stack,
    });
  }
);

export default axios;
