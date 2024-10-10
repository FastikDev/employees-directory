import React, { useEffect } from 'react';
import { fetchWorkers } from '../../common/utils/gateway';
import { useDispatch, useSelector } from 'react-redux';
import { WorkersData, setSorting } from '../../common/redux/WorkersSlice';
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import Spinner from './component/Spinner';
import Failed from '../Failed';
import Error from '../Error';
import { getEmployees, groupWorkers } from '../../common/utils/utils';
import { RootState } from '../../store';
import './index.scss';
import Skelet from '../Skeleton';

const WorkersList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkers());
    dispatch(setSorting('alphabet'));
  }, [dispatch]);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { loading } = useSelector((state: RootState) => state.workers);

  const position = useSelector((state: RootState) => state.workers.position);
  const workers = useSelector((state: RootState) => state.workers.workersList);
  const sorting = useSelector((state: RootState) => state.workers.sorting);
  const searchValue = '';

  const sortedWorkers = getEmployees(workers, sorting, position, searchValue);
  const groupedWorker = groupWorkers(sortedWorkers, sorting);

  switch (loading) {
    case 'loading':
      return <Skelet />;
    case 'failed':
      return <Error />;
    case 'success':
      if (!sortedWorkers.length) {
        return <Failed />;
      }
      break;
  }

  const onWorkersSelect = (id: string | undefined) => {
    console.log('Selected Worker ID:', id);

    if (id) {
      const currentPath = `${window.location.pathname}${window.location.search}`;
      navigate(`worker/${id}`, { state: { from: currentPath } });
    }
  };

  return (
    <section className="workers">
      {Object.keys(groupedWorker).map(year => (
        <React.Fragment key={year}>
          {sorting !== 'alphabet' && (
            <li className="year">
              <span className="year__line" />
              <h3 className="year__date">{year}</h3>
              <span className="year__line" />
            </li>
          )}
          <ul>
            {(groupedWorker as Record<string, WorkersData[]>)[year].map(worker => (
              <li className="worker" onClick={() => onWorkersSelect(worker.id)} key={worker.id}>
                <img
                  className="worker__avatar"
                  src={worker.avatar || '../../../public/images/default_img.png'}
                  alt={`${worker.name}'s avatar`}
                />
                <div className="worker__info">
                  <div className="worker__name">
                    {worker.name} <span className="worker__tag">{worker.tag}</span>
                  </div>
                  <div className="worker__description">{worker.position}</div>
                </div>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </section>
  );
};

export default WorkersList;
