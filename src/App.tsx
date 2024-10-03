import React from 'react';
import Header from './features/Header';

import WorkersList from './features/WorkersList/WorkersList';

const App = () => {
  return (
    <div className="page">
      <Header />
      <WorkersList />
    </div>
  );
};

export default App;
