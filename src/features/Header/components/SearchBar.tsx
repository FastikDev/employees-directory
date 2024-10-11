import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSorting } from '../../../common/redux/WorkersSlice';
import Sorting from '../../Sorting';
import '../styles/SearchBar.scss';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [isSortingVisible, setIsSortingVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const handleSortingChange = (btnType: 'alphabet' | 'birthday') => {
    dispatch(setSorting(btnType));

    const saveSort = new URLSearchParams(searchParams);

    btnType === 'alphabet' ? saveSort.delete('sort') : saveSort.set('sort', 'birthday');
  };

  return (
    <div className="search">
      <input type="search" placeholder="Search by name, tag, email..." className="search__input" />
      <i className="fa-solid fa-magnifying-glass search__icon"></i>
      <i
        className={`fa-solid fa-bars search__filter ${
          isSortingVisible ? 'search_filter_active' : ''
        }`}
        onClick={toggleSorting}
      ></i>
      <button className="search__cancel">Cancel</button>
      {isSortingVisible && (
        <Sorting onOverlayClick={handleClickOutside} onSortingChange={handleSortingChange} />
      )}
    </div>
  );
};

export default SearchBar;
