// Rendering Layer Control
// React Router

import React, { Component } from 'react';
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import history from '../shared/history';
import RequireAuth from '../components/auth/authentication';

// Layout Parts
import Navbar from '../components/layouts/Navbar';

// Account Signup & Signin
import Signin from '../components/auth/signin';
import Signup from '../components/auth/singup';
import Signout from '../components/auth/signout';
import Verify from '../components/auth/verify';

import PasswordReset from '../components/auth/passwordReset';
import PasswordUpdate from '../components/auth/passwordUpdate';
import PasswordComplete from '../components/auth/passwordComplete';


// Auth Free Pages
import Landing from '../components/pages/Landing';
import HelpPage from '../components/pages/HelpPage';
import NotFound404 from '../components/NotFound404';

import Contact from '../components/pages/Contact';
import TempolaryEntry from '../components/auth/tempolaryentry';

// Auth Pages
import Dashborad from '../components/dashboard/Dashboard';
import Profile from '../components/dashboard/profile/Profile';
import CreateProfile from '../components/dashboard/profile/CreateProfile';
import ConfirmProfile from '../components/dashboard/profile/ConfirmProfile';
import CompleteProfile from '../components/dashboard/profile/CompleteProfile';

import Auth from '../components/auth/Auth';
import PlayGround from '../components/playground/PlayGround';
import ErrorBoundary from '../ErrorBoundary';


class AppRouter extends Component {
  render() {


    return (
      <BrowserRouter>
        <Router history={history}>
          <React.Fragment>
            <Navbar />
            <Switch>

              <Route exact path="/" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/verify/:id" component={Verify} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signout" component={Signout} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/help" component={HelpPage} />
              <Route exact path="/tempolaryentry" component={TempolaryEntry} />
              <Route exact path="/auth" component={RequireAuth(Auth)} />

              <Route exact path="/reset-password" component={PasswordReset} />
              <Route exact path="/update-password/:id" component={PasswordUpdate} />
              <Route exact path="/complete-password" component={PasswordComplete} />
              <Route
                exact
                path="/PlayGround"
                component={RequireAuth(PlayGround)}
              />
              <Route
                exact
                path="/dashboard"
                component={RequireAuth(Dashborad)}
              />
              <Route
                exact
                path="/dashboard/profile"
                component={RequireAuth(Profile)}
              />
              <Route
                exact
                path="/dashboard/profile/create-profile"
                component={RequireAuth(CreateProfile)}
              />
              <Route
                exact
                path="/dashboard/profile/confirm-profile"
                component={RequireAuth(ConfirmProfile)}
              />
              <Route
                exact
                path="/dashboard/profile/complete-profile"
                component={RequireAuth(CompleteProfile)}
              />
              <Route exact path="/" component={Landing} />
              <Route component={NotFound404} />

            </Switch>
          </React.Fragment>
        </Router>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(AppRouter);

// import PrivateRoute from './PrivateRoute';
// <Switch>
// <PrivateRoute
//   exact
//   path="/dashboard/profile"
//   component={Profile}
// />
// </Switch>
