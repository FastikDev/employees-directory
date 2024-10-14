import React from 'react';
import '../styles/skeleton.scss';

const Skeleton = () => {
  return (
    <div className="skeleton">
      <ul className="skeleton__list">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="skeleton__item">
            <div className="skeleton__img" />
            <div className="skeleton__info">
              <div className="skeleton__name" />
              <div className="skeleton__description" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skeleton;
