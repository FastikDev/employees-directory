import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';
import './index.scss';

const Header = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDesctop) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [isDesctop]);

  return (
    <header className="header">
      {!loading && <h1 className="header__title">Search</h1>}
      {loading && (
        <div className="loading">
          <h1 className="header__title header__title_offline">Search</h1>
          <p className="error-network__description">Wait a second, I'm loading...</p>
        </div>
      )}
      {/* {!isNetwork && <h1 className="header__title">Search</h1>}
      <div className="error-network">
        <h1 className="header__title header__title_offline">Search</h1>
        <p className="error-network__description">
          I can't update my data. Check your internet connection.
        </p>
      </div> */}
      {!loading && <SearchBar isLoading={loading} />}
      <Navigation />
    </header>
  );
};

export default Header;
