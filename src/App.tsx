import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';
import Header from './features/Header';
import WorkersList from './features/Workers';
import Skelet from './features/Skeleton';
import WorkerInfo from './features/WorkerInfo';
import Failed from './features/Failed';
import Error from './features/Error';
import ErrorBoundary from './features/Error/componets/ErrorBoundary';

const App = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <ErrorBoundary onError={() => {}}>
          <Header />
          {loading ? <Skelet /> : <WorkersList />}
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

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    if (window.screenY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startY !== null) {
      const distance = e.touches[0].clientY - startY;
      if (distance > 50) {
        setIsRefreshing(true);
      }
    }
  };

  const handleTouchEnd = () => {
    if (isRefreshing) {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 2000);
    }
    setStartY(null);
  };

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [startY, isRefreshing]);

  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
