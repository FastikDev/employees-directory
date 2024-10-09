import React, { useEffect } from 'react';
import { fetchWorkers } from '../../common/utils/gateway';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from './component/Spinner';
import Failed from '../Failed';
import Error from '../Error';
import { getEmployees } from '../../common/utils/utils';
import { RootState } from '../../store';
import { setSorting } from '../../common/redux/WorkersSlice';
import './index.scss';
import Skelet from '../Skeleton';

const WorkersList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkers());
    dispatch(setSorting('alphabet'));
  }, [dispatch]);

  const { workersList, sorting, position, loading } = useSelector(
    (state: RootState) => state.workers,
  );

  const displayedEmployees = getEmployees(workersList, sorting, position);

  switch (loading) {
    case 'loading':
      return <Skelet />;
    case 'failed':
      return <Error />;
    case 'success':
      if (!displayedEmployees.length) {
        return <Failed />;
      }
  }

  if (!displayedEmployees.length) {
    return <Failed />;
  }

  return (
    <>
      {/* <Spinner /> */}
      <section className="workers">
        {displayedEmployees.map(worker => (
          <Link key={worker.email} to={`/worker/${worker.email}`} className="worker">
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
          </Link>
        ))}
      </section>
    </>
  );
};

export default WorkersList;
