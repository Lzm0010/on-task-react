import React, {Fragment} from 'react';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Fragment>
      <Auth/>
      <Dashboard/>
    </Fragment>
  );
}

export default App;
