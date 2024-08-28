/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Custom ErrorLog hook to handle UI errors in prod
 */
import { useEffect, useState } from 'react';

export const useErrorLog = (fileLocation) => {
  const [file, setFile] = useState('');
  useEffect(() => {
    setFile(fileLocation);
  }, [fileLocation]);

  /**
   * Console the error in PM2 log
   * @param {*} error
   */
  const handleError = (error) => {
    const errorLogString = `Date: ${new Date()} \nFile: ${file} \nError: ${error.message}`;
    console.log('------------------------');
    console.log(errorLogString);
    console.log('**** Stack Trace ****');
    console.log(error.stack);
    console.log('------------------------');
  };

  return handleError;
};
