import React, { useEffect } from 'react';
import { fetchEmployees } from '../../common/utils/gateway';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeesData, setPosition, setSorting } from '../../common/redux/EmployeesSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Skeleton from './component/Skeleton';
import NotFound from './component/NotFound';
import Error from '../Error';
import { getEmployees, groupedEmployees } from '../../common/utils/utils';
import { AppDispatch, RootState } from '../../store';
import './index.scss';

const EmployeesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'alphabet';
  const positionParam = searchParams.get('position') || 'all';

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(setSorting(sortParam === 'birthday' ? 'birthday' : 'alphabet'));
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
  }, [dispatch, sortParam, positionParam]);

  const { loading } = useSelector((state: RootState) => state.employees);
  const position = useSelector((state: RootState) => state.employees.position);
  const employees = useSelector((state: RootState) => state.employees.employeesList);
  const sorting = useSelector((state: RootState) => state.employees.sorting);

  const onEmployeesSelect = (id: string | undefined) => {
    if (id) {
      const currentPath = `${window.location.pathname}${window.location.search}`;
      navigate(`/employees/${id}`, { state: { from: currentPath } });
    }
  };

  const sortedEmployees = getEmployees(employees, sorting, position, searchText);
  const groupedEmployee = groupedEmployees(sortedEmployees, sorting);

  switch (loading) {
    case 'loading':
      return <Skeleton />;
    case 'failed':
      return <Error />;
    case 'success':
      if (!sortedEmployees.length) {
        return <NotFound />;
      }
      break;
  }

  return (
    <section className="employees">
      {Object.keys(groupedEmployee).map(year => (
        <React.Fragment key={year}>
          {sorting !== 'alphabet' && (
            <li className="year">
              <div className="year__line" />
              <h3 className="year__date">{year}</h3>
              <div className="year__line" />
            </li>
          )}
          <ul>
            {(groupedEmployee as Record<string, EmployeesData[]>)[year].map(employee => (
              <li
                className="employee"
                onClick={() => onEmployeesSelect(employee.id)}
                key={employee.id}
              >
                <img
                  className="employee__avatar"
                  src={employee.avatar || '../../../public/images/default_img.png'}
                  alt={`${employee.name}'s avatar`}
                />
                <div className="employee__info">
                  <div className="employee__name">
                    {employee.name} <span className="employee__tag">{employee.tag}</span>
                  </div>
                  <div className="employee__description">{employee.position}</div>
                </div>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </section>
  );
};

export default EmployeesList;
