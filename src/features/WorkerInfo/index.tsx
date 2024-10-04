import React from 'react';
import './index.scss';

const WorkerInfo = () => {
  return (
    <section className="info">
      <i className="fa-solid fa-less-than info__icon"></i>
      <div className="autor-info">
        <img
          className="autor-info__avatar"
          src="https://ipfs.io/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/592.jpg"
          alt="Autor avatar"
        />
        <h1 className="autor-info__name">
          Alexey Minogarov<span className="autor-info__tag">mi</span>
        </h1>
        '<div className="autor-info__description">Analist</div>
      </div>
      <div className="autor-contacts">
        <div className="birthday">
          <i className="fa-regular fa-star birthday__icon"></i>
          <span className="birthday__date">5 June 1996</span>
          <span className="birthday__age">24 years old</span>
        </div>
        <div className="phone">
          <i className="fa-solid fa-phone phone__icon"></i>
          <a className="phone__number" href="tel:+7 (999) 900 90 90">
            +7 (999) 900 90 90
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkerInfo;
