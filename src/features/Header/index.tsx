import React from 'react';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import Spinner from '../WorkersList/Spinner';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Search</h1>
      <SearchBar />
      <Spinner />
      <Navigation />
    </header>
  );
};

export default Header;
