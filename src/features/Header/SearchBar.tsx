import React from 'react';

const SearchBar = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Search by name, tag, email..." className="search__input" />
      <i className="fa-solid fa-magnifying-glass search__icon"></i>
      <i className="fa-solid fa-bars search__filter"></i>
      <button className="search__cancel">Cancel</button>
    </div>
  );
};

export default SearchBar;
