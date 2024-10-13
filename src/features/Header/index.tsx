import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';
import './index.scss';

const Header = () => {
  const [searchValue, setSearchValue] = useSearchParams();
  const [searchText, setSearchText] = useState<string>(searchValue.get('search') || '');

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
      <header className="header">
        <h1 className="header__title">Search</h1>
        <SearchBar onSearchChange={handleSearching} />
        <Navigation />
      </header>
    </>
  );
};

export default Header;
