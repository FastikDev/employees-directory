import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './component/Spinner';
import './index.scss';

const WorkersList = () => {
  const avatar =
    'https://ipfs.io/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/592.jpg';

  return (
    <>
      {/* <Spinner /> */}
      <section className="workers">
        <Link to="/worker/1" className="worker">
          <img className="worker__avatar" src={avatar} alt="Worker Avatar" />
          <div className="worker__info">
            <div className="worker__name">
              Alexey Minogarov<span className="worker__tag">mi</span>
            </div>
            <div className="worker__description">Analyst</div>
          </div>
          {/* <span className="worker__birthday">5 June</span> */}
        </Link>
        {/* <div className="year">
        <hr className="year__line" />
        <span className="year__date">2022</span>
        <hr className="year__line" />
      </div> */}
        <Link to="/worker/2" className="worker">
          <img className="worker__avatar" src={avatar} alt="Worker Avatar" />
          <div className="worker__info">
            <div className="worker__name">
              Alexey Minogarov<span className="worker__tag">mi</span>
            </div>
            <div className="worker__description">Analyst</div>
          </div>
        </Link>

        <Link to="/worker/3" className="worker">
          <img className="worker__avatar" src={avatar} alt="Worker Avatar" />
          <div className="worker__info">
            <div className="worker__name">
              Alexey Minogarov<span className="worker__tag">mi</span>
            </div>
            <div className="worker__description">Analyst</div>
          </div>
        </Link>

        <Link to="/worker/4" className="worker">
          <img className="worker__avatar" src={avatar} alt="Worker Avatar" />
          <div className="worker__info">
            <div className="worker__name">
              Alexey Minogarov<span className="worker__tag">mi</span>
            </div>
            <div className="worker__description">Analyst</div>
          </div>
        </Link>

        <Link to="/worker/5" className="worker">
          <img className="worker__avatar" src={avatar} alt="Worker Avatar" />
          <div className="worker__info">
            <div className="worker__name">
              Alexey Minogarov<span className="worker__tag">mi</span>
            </div>
            <div className="worker__description">Analyst</div>
          </div>
        </Link>

        <Link to="/worker/6" className="worker">
          <img className="worker__avatar" src={avatar} alt="Worker Avatar" />
          <div className="worker__info">
            <div className="worker__name">
              Alexey Minogarov<span className="worker__tag">mi</span>
            </div>
            <div className="worker__description">Analyst</div>
          </div>
        </Link>

        <Link to="/worker/7" className="worker">
          <img className="worker__avatar" src={avatar} alt="Worker Avatar" />
          <div className="worker__info">
            <div className="worker__name">
              Alexey Minogarov<span className="worker__tag">mi</span>
            </div>
            <div className="worker__description">Analyst</div>
          </div>
        </Link>

        <Link to="/worker/8" className="worker">
          <img className="worker__avatar" src={avatar} alt="Worker Avatar" />
          <div className="worker__info">
            <div className="worker__name">
              Alexey Minogarov<span className="worker__tag">mi</span>
            </div>
            <div className="worker__description">Analyst</div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default WorkersList;
