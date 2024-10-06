import React from 'react';
import './index.scss';

const Skelet = () => {
  return (
    <div className="skelet">
      <ul className="skelet__list">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="skelet__item">
            <div className="skelet__img" />
            <div className="skelet__info">
              <div className="skelet__name" />
              <div className="skelet__description" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skelet;
