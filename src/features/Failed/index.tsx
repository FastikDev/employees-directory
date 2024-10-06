import React from 'react';
import './index.scss';
import searchImg from './search.jpg';

const Failed = () => {
  return (
    <section className="failed">
      <img className="failed__img" src={searchImg} alt="Search img" />
      <h1 className="failed__title">We didn't find anyone</h1>
      <p className="failed__description">Try adjusting your request</p>
    </section>
  );
};

export default Failed;
