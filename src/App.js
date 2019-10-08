import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { Auth, Home } from './pages';


const App = props => {
  const { isAuthed } = props;

  return (
    <div className="wrapper">
        <Route exact path={['/login', '/register', '/register/verify']} component={Auth}/>
        <Route exact path='/' render={() => isAuthed ? <Home /> : <Redirect to='/login'/>}/>
    </div>
  );
}

export default connect(({ user }) => ({ isAuthed: user.isAuthed }))(App);