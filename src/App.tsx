import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Header from './features/Header';
import WorkersList from './features/Workers';
import WorkerInfo from './features/WorkerInfo';
import Failed from './features/Failed';
import Error from './features/Error';
import ErrorBoundary from './features/Error/componets/ErrorBoundary';

const App = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });

  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <ErrorBoundary onError={() => {}}>
          <Header />
          <WorkersList />
        </ErrorBoundary>
      ),
    },
    {
      path: 'worker/:workerId',
      element: <WorkerInfo />,
    },
    {
      path: '/error',
      element: (
        <>
          {isDesctop && <Header />}
          <Error />
        </>
      ),
    },
    {
      path: '*',
      element: (
        <ErrorBoundary onError={() => {}}>
          <Header />
          <Failed />
        </ErrorBoundary>
      ),
    },
  ];

  const router = createBrowserRouter(routes, {
    basename: '/',
  });

  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
