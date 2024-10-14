import React from 'react';
import './phoneCalled.scss';

const PhoneCalled = ({ onCancelClick, phone }) => {
  console.log('Phone: ', phone);

  return (
    <div className="phone overlay" onClick={onCancelClick}>
      <div className="phone-contant">
        <a className="phone-contant__btn" href={`tel:${phone}`}>
          {phone}
        </a>
        <button className="phone-contant__btn phone-contant__btn_cancel" onClick={onCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PhoneCalled;
