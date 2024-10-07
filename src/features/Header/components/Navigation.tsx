import React from 'react';
import '../styles/navigation.scss';

const Navigation = () => {
  return (
    <ul className="navigation">
      <li className="navigation__item">All</li>
      <li className="navigation__item">Designers</li>
      <li className="navigation__item">Analysts</li>
      <li className="navigation__item">Managers</li>
      <li className="navigation__item">IOS</li>
      <li className="navigation__item">Android</li>
      <li className="navigation__item">Favorite</li>
    </ul>
  );
};

export default Navigation;
