import React from 'react';
import './index.scss';
import error from '../../../public/images/error.png';

const Error = () => {
  return (
    <div className="error">
      <img src={error} alt="Error" />
      <h1 className="error__title error__title_mobile">Some unexpected error...</h1>
      <h1 className="error__title error__title_desctop">Unexpected error occurred...</h1>
      <p className="error__description">Our team is fixing it now</p>
      <a href="/" className="error__link error__link_mobile">
        Try again
      </a>
      <a href="/" className="error__link error__link_desctop">
        Reload page
      </a>
    </div>
  );
};

export default Error;
