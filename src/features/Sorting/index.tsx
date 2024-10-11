import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './index.scss';

interface SortingProps {
  onOverlayClick: (event) => void;
  onSortingChange: (btnType: 'alphabet' | 'birthday') => void;
}

const Sorting: React.FC<SortingProps> = ({ onOverlayClick, onSortingChange }) => {
  const activeSorting = useSelector((state: RootState) => state.workers.sorting);

  return (
    <div className="sorting overlay" onClick={onOverlayClick}>
      <div className="sorting__content">
        <button className="sorting__close-btn" onClick={onOverlayClick}></button>
        <h1 className="sorting__title">Sorting</h1>
        <div className="sort">
          <button
            className={`sort__btn ${activeSorting === 'alphabet' ? 'sort__btn_active' : ''}`}
            onClick={() => onSortingChange('alphabet')}
          />
          <div className="sort__text">Alphabetically</div>
        </div>
        <div className="sort">
          <button
            className={`sort__btn ${activeSorting === 'birthday' ? 'sort__btn_active' : ''}`}
            onClick={() => onSortingChange('birthday')}
          />
          <div className="sort__text">By birthday</div>
        </div>
      </div>
    </div>
  );
};

export default Sorting;
