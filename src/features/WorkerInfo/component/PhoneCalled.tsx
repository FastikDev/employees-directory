import React from 'react';
import './phoneCalled.scss';

const PhoneCalled = ({ onCancelClick }) => {
  return (
    <div className="phone overlay" onClick={onCancelClick}>
      <div className="phone-contant">
        <a className="phone-contant__btn" href="tel:+7 (999) 900 90 90">
          +7 (999) 900 90 90
        </a>
        <button className="phone-contant__btn phone-contant__btn_cancel" onClick={onCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PhoneCalled;
