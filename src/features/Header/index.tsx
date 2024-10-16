import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';
import Refresh from './components/Refresh';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './index.scss';

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 1279 });

  const [searchValue] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>(searchValue.get('search') || '');
  const [isNetwork, setIsNetwork] = useState(true);

  const { loading: employessLoading } = useSelector((state: RootState) => state.employees);

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
    setLoading(employessLoading === 'loading');
  }, [employessLoading]);

  useEffect(() => {
    const currentSearch = searchValue.get('search') || '';

    if (currentSearch !== searchText) {
      setSearchText(currentSearch);
    }
  }, [searchValue, searchText]);

  const handleSearching = (text: string) => {
    if (text === searchText) {
      return;
    }
    setSearchText(text);
  };

  return (
    <>
      <header className={`header ${loading || (!loading && !isNetwork) ? 'header_offline' : ''}`}>
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
        {!loading && isNetwork && <SearchBar onSearchChange={handleSearching} />}
        <Navigation />
      </header>
      {loading && isMobile && <Refresh />}
    </>
  );
};

export default Header;
