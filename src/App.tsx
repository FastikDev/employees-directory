import React from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Header from './features/Header';
import WorkersList from './features/WorkersList/WorkersList';
import WorkerInfo from './features/WorkerInfo';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <WorkersList />
      </>
    ),
  },
  {
    path: 'worker/:workerId',
    element: <WorkerInfo />,
  },
];

const router = createBrowserRouter(routes, {
  basename: '/',
});

const App = () => {
  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
