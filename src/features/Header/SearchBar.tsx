import React, { useState } from 'react';
import Sorting from '../Sorting';

const SearchBar = ({ isLoading }) => {
  const [isSortingVisible, setIsSortingVisible] = useState(false);

  const toggleSorting = () => {
    setIsSortingVisible(prev => !prev);
  };

  const handleClickOutside = event => {
    if (
      event.target.classList.contains('overlay') ||
      event.target.classList.contains('sorting__close-btn')
    ) {
      setIsSortingVisible(false);
    }
  };

  return (
    <div className="search">
      <input type="search" placeholder="Search by name, tag, email..." className="search__input" />
      {!isLoading && (
        <>
          <i className="fa-solid fa-magnifying-glass search__icon"></i>
          <i className="fa-solid fa-bars search__filter" onClick={toggleSorting}></i>
        </>
      )}

      <button className="search__cancel">Cancel</button>
      {isSortingVisible && <Sorting onOverlayClick={handleClickOutside} />}
    </div>
  );
};

export default SearchBar;
