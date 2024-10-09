import React, { useState, useEffect } from 'react';
import './index.scss';
import PhoneCalled from './component/PhoneCalled';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const WorkerInfo = () => {
  const [isCalledVisible, setIsCalledVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const { email } = useParams();

  const workers = useSelector((state: RootState) => state.workers.workersList);
  const worker = workers.find(worker => worker.email === email);

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  const toggleCalled = () => {
    setIsCalledVisible(prev => !prev);
  };

  const handleClickOutside = event => {
    if (
      event.target.classList.contains('overlay') ||
      event.target.classList.contains('phone-contant__btn_cancel')
    ) {
      setIsCalledVisible(false);
    }
  };

  return (
    <section className="info">
      <div className="autor-info">
        <i className="fa-solid fa-less-than info__icon" onClick={() => navigate(-1)}></i>
        <img
          className="autor-info__avatar"
          src={worker.avatar || '../../../public/images/default_img.png'}
          alt="Autor avatar"
        />
        <h1 className="autor-info__name">
          {worker.name} <span className="autor-info__tag">{worker.tag}</span>
        </h1>
        <div className="autor-info__description">{worker.position}</div>
      </div>
      <div className="autor-contacts">
        <div className="birthday">
          <div onClick={toggleFavorite} style={{ cursor: 'pointer' }}>
            <svg
              className="birthday__icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill={isFavorite ? 'rgba(5, 5, 16, 1)' : 'none'}
              stroke="rgba(5, 5, 16, 1)"
              strokeWidth="2"
            >
              <path d="M10 15.273l-6.18 3.247 1.18-6.868-5-4.855 6.91-1.005L10 0l2.09 6.247 6.91 1.005-5 4.855 1.18 6.868z" />
            </svg>
          </div>
          <span className="birthday__date">5 June 1996</span>
          <span className="birthday__age">24 years old</span>
        </div>
        <div className="phone">
          <i className="fa-solid fa-phone phone__icon"></i>
          <span className="phone__number" onClick={toggleCalled}>
            {worker.phone}
          </span>
        </div>
      </div>
      {isCalledVisible && <PhoneCalled onCancelClick={handleClickOutside} />}
    </section>
  );
};

export default WorkerInfo;
