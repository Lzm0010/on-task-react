import React, {Fragment} from 'react';
import Auth from './pages/auth';
import FetchContainer from './containers/fetchContainer';

function App() {
  return (
    <Fragment>
      <Auth/>
      <FetchContainer />
    </Fragment>
  );
}

export default App;
