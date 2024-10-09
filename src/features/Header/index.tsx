import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './index.scss';
import Refresh from '../Workers/component/Refresh';

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 1279 });

  const [loading, setLoading] = useState(true);
  const [isNetwork, setIsNetwork] = useState(true);

  const { loading: workersLoading } = useSelector((state: RootState) => state.workers);

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsNetwork(navigator.onLine);
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    updateNetworkStatus();

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  useEffect(() => {
    setLoading(workersLoading === 'loading');
  }, [workersLoading]);

  return (
    <>
      <header className="header">
        {loading && (
          <div className="loading">
            <h1 className="header__title header__title_offline">Search</h1>
            <p className="error-network__description">Wait a second, I'm loading...</p>
          </div>
        )}
        {!loading && !isNetwork && (
          <div className="error-network">
            <h1 className="header__title header__title_offline">Search</h1>
            <p className="error-network__description">
              I can't update my data. Check your internet connection.
            </p>
          </div>
        )}
        {!loading && isNetwork && <h1 className="header__title">Search</h1>}
        {isNetwork && <SearchBar />}
        <Navigation />
      </header>
      {loading && isMobile && <Refresh />}
    </>
  );
};

export default Header;
