import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSorting } from '../../../common/redux/WorkersSlice';
import Sorting from '../../Sorting';
import '../styles/SearchBar.scss';

const SearchBar = ({ onSearchChange }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isSortingVisible, setIsSortingVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const search = new URLSearchParams(location.search).get('search');
    if (search) {
      setSearchValue(search);
    } else {
      setSearchValue('');
    }
  }, [location.search]);

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

  const clearInput = () => {
    console.log('Clear');
    setSearchValue('');

    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate({ search: params.toString() }, { replace: true });
  };

  const handleSortingChange = (btnType: 'alphabet' | 'birthday') => {
    dispatch(setSorting(btnType));

    const saveSort = new URLSearchParams(location.search);

    btnType === 'alphabet' ? saveSort.delete('sort') : saveSort.set('sort', 'birthday');
    navigate({ search: saveSort.toString() }, { replace: true });
  };

  const handleSearchChange = event => {
    const value = event.target.value;
    setSearchValue(value);

    const params = new URLSearchParams(location.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() }, { replace: true });

    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search by name, tag, email..."
        className="search__input"
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <i className="fa-solid fa-magnifying-glass search__icon"></i>
      <i
        className={`fa-solid fa-bars search__filter ${
          isSortingVisible ? 'search_filter_active' : ''
        }`}
        onClick={toggleSorting}
      ></i>
      <button className="search__cancel" type="button" onClick={clearInput}>
        Cancel
      </button>

      {isSortingVisible && (
        <Sorting onOverlayClick={handleClickOutside} onSortingChange={handleSortingChange} />
      )}
    </div>
  );
};

export default SearchBar;
