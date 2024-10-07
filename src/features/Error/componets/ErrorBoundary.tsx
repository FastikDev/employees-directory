import React, { useState, useEffect, ReactNode } from 'react';
import Error from '../index';

interface ErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, onError }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      setHasError(true);
      console.error('Ошибка произошла:', error);
      onError();
    };

    window.addEventListener('error', errorHandler);
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, [onError]);

  useEffect(() => {
    const promiseRejectionHandler = (event: PromiseRejectionEvent) => {
      setHasError(true);
      console.error('Ошибка в промисе:', event.reason);
      onError();
    };

    window.addEventListener('unhandledrejection', promiseRejectionHandler);
    return () => {
      window.removeEventListener('unhandledrejection', promiseRejectionHandler);
    };
  }, [onError]);

  if (hasError) {
    return <Error />;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
