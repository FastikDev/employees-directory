import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosition } from '../../../common/redux/EmployeesSlice';
import { positions } from './positions';
import { RootState } from '../../../store';
import '../styles/navigation.scss';
import { useSearchParams } from 'react-router-dom';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentPosition = useSelector((state: RootState) => state.employees.position);
  const [searсh, setSearch] = useSearchParams();

  useEffect(() => {
    const positionParam = searсh.get('position');
    if (positionParam) {
      dispatch(
        setPosition(
          positionParam as
            | 'all'
            | 'designer'
            | 'analyst'
            | 'manager'
            | 'android'
            | 'iso'
            | 'favorite',
        ),
      );
    }
  }, [dispatch, searсh]);

  const handlePosition = (
    position: 'all' | 'designer' | 'analyst' | 'manager' | 'android' | 'iso' | 'favorite',
  ) => {
    searсh.set('position', position);
    setSearch(searсh);
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
