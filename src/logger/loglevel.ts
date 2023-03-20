import log from 'loglevel';

if (process.env.REACT_APP_ENVIRONMENT === 'production') {
  log.setLevel('warn');
}
if (process.env.REACT_APP_ENVIRONMENT === 'development') {
  log.setLevel('debug');
}

export const logger = log;
