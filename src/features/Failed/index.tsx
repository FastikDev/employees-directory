import React from 'react';
import './index.scss';

const Failed = () => {
  return (
    <section className="failed">
      <img className="failed__img" src="../../../public/images/search.png" alt="Search img" />
      <h1 className="failed__title">We didn't find anyone</h1>
      <p className="failed__description">Try adjusting your request</p>
    </section>
  );
};

export default Failed;
