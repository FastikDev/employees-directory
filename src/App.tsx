import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Header from './features/Header';
import EmployeesList from './features/Employees';
import EmployeeInfo from './features/Employees/component/EmloyeesInfo';
import Error from './features/Error';
import ErrorBoundary from './features/Error/componets/ErrorBoundary';
import NotFound from './features/Employees/component/NotFound';

const App = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });

  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <ErrorBoundary onError={() => {}}>
          <Header />
          <EmployeesList />
        </ErrorBoundary>
      ),
    },
    {
      path: 'employees/:id',
      element: <EmployeeInfo />,
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
          <NotFound />
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
