import React from 'react';
import './index.scss';

const Sorting = ({ onOverlayClick }) => {
  return (
    <div className="sorting overlay" onClick={onOverlayClick}>
      <div className="sorting__content">
        <button className="sorting__close-btn"></button>
        <h1 className="sorting__title">Sorting</h1>
        <div className="sort">
          <button className="sort__btn sort__btn_active" />
          <span className="sort__text">Alphabetically</span>
        </div>
        <div className="sort">
          <button className="sort__btn" />
          <span className="sort__text">By birthday</span>
        </div>
      </div>
    </div>
  );
};

export default Sorting;
