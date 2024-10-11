import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosition } from '../../../common/redux/WorkersSlice';
import { positions } from './positions';
import { RootState } from '../../../store';
import '../styles/navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentPosition = useSelector((state: RootState) => state.workers.position);

  const handlePosition = (
    position: 'all' | 'designer' | 'analyst' | 'manager' | 'android' | 'iso' | 'favorite',
  ) => {
    dispatch(setPosition(position));
  };

  return (
    <ul className="navigation">
      {positions.map(item => (
        <li
          key={item.value}
          className={`navigation__item ${
            currentPosition === item.value ? 'navigation__item_selected' : ''
          }`}
          onClick={() =>
            handlePosition(
              item.value as
                | 'all'
                | 'designer'
                | 'analyst'
                | 'manager'
                | 'android'
                | 'iso'
                | 'favorite',
            )
          }
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
