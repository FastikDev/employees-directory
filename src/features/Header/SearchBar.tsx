import React from 'react';

const SearchBar = () => {
  return (
    <div className="search">
      <i className="fa-solid fa-magnifying-glass search__icon"></i>
      <input type="text" placeholder="Search by name, tag, email..." className="search__input" />
      <i className="fa-solid fa-bars search__filter"></i>
    </div>
  );
};

export default SearchBar;
