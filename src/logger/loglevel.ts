import log from 'loglevel';

if (process.env.REACT_APP_ENVIRONMENT === 'production') {
  log.setLevel('warn');
}
if (process.env.REACT_APP_ENVIRONMENT === 'development') {
  log.setLevel('debug');
}

/*
  ***USAGE***

  logger.debug('Debug message');   -->  console.log analog
  logger.warn('Warning message');  -->  warning message
  logger.error('Error message');   -->  error message
*/

export const logger = log;
