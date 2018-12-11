import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { SpecialNavBar } from '../NavigationBar';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (!isAuthenticated ? (
        <React.Fragment>
          <header className="hbw-header no-shadow">
            <SpecialNavBar />
          </header>
          <main className="hbw-content showHeader animated fadeIn ">
            <Component {...props} />
          </main>
        </React.Fragment>
      ) : (
        <Redirect to={localStorage.lastUrl ? JSON.parse(localStorage.lastUrl) : '/home'} />
      ))
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: !!localStorage.token || !!state.toJS().user.loggedUser.id,
});

export default connect(mapStateToProps)(GuestRoute);
