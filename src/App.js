import React, {useState} from 'react';
import {TasksProvider} from './context/tasksContext';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import PrivateRoute from './nav/privateRoute';
import Auth from './pages/auth';
import FetchContainer from './containers/fetchContainer';

function App() {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState({})
  const [planner, setPlanner] = useState({})

  const handleLogin = (user, planner) => {
    setUser(user)
    setPlanner(planner)
    setAuthed(true)
  };

  // const logOut = () => {
  //   window.localStorage.clear()
  //   window.location.href = "/login" 
  // }
  
  return (
    <TasksProvider>
      <Router>
        <Switch>
          <Route exact path="/login" render={props => <Auth {...props} handleLogin={handleLogin}/>}/>
          <PrivateRoute exact path="/dashboard" component={FetchContainer} authed={authed} planner={planner} user={user}/>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </TasksProvider>
  );
}

export default App;
