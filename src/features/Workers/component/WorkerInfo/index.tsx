import React, { useState } from 'react';
import { getAge, getBirthDate } from '../../../../common/utils/utils';
import './index.scss';
import PhoneCalled from './component/PhoneCalled';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../NotFound';
import { setFavorite } from '../../../../common/redux/WorkersSlice';

const WorkerInfo = () => {
  const [isCalledVisible, setIsCalledVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { workerId } = useParams<{ workerId: string }>();

  const worker = useSelector((state: RootState) =>
    state.workers.workersList.find(worker => worker.id === workerId),
  );

  if (!worker) {
    return <NotFound />;
  }

  const { tag, avatar, position, birthDate, name, phone, isFavorite } = worker;

  const birthDateMoment = getBirthDate(birthDate);
  const age = getAge(birthDate);

  const toggleFavorite = () => {
    console.log('Текущий ID работника:', workerId);
    console.log('Текущий статус избранного:', isFavorite);

    const newFavoriteStatus = !isFavorite;
    console.log('Новое состояние избранного:', newFavoriteStatus);

    dispatch(setFavorite({ id: workerId, isFavorite: newFavoriteStatus }));
  };

  const toggleCalled = () => {
    setIsCalledVisible(prev => !prev);
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (
      (event.target as HTMLElement).classList.contains('overlay') ||
      (event.target as HTMLElement).classList.contains('phone-contant__btn_cancel')
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
          src={avatar || '../../../public/images/default_img.png'}
          alt="Autor avatar"
        />
        <h1 className="autor-info__name">
          {name} <span className="autor-info__tag">{tag}</span>
        </h1>
        <div className="autor-info__description">{position}</div>
      </div>
      <div className="autor-contacts">
        <div className="birthday">
          <svg
            className="birthday__icon"
            onClick={toggleFavorite}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={isFavorite ? 'rgba(5, 5, 16, 1)' : 'none'}
            stroke="rgba(5, 5, 16, 1)"
            strokeWidth="2"
          >
            <path d="M10 15.273l-6.18 3.247 1.18-6.868-5-4.855 6.91-1.005L10 0l2.09 6.247 6.91 1.005-5 4.855 1.18 6.868z" />
          </svg>
          <span className="birthday__date">{birthDateMoment}</span>
          <span className="birthday__age">{age} year</span>
        </div>
        <div className="phone">
          <i className="fa-solid fa-phone phone__icon"></i>
          <span className="phone__number" onClick={toggleCalled}>
            {phone}
          </span>
        </div>
      </div>
      {isCalledVisible && <PhoneCalled onCancelClick={handleClickOutside} phone={phone} />}
    </section>
  );
};

export default WorkerInfo;
