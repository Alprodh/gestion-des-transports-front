import { config } from './common';

export const environment = Object.assign({
  production: true,
  baseUrl: 'http://localhost:8080/'
  // baseUrl: 'https://gestion-des-transports-back.herokuapp.com/'
}, config);
