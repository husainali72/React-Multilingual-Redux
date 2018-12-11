import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Route, Redirect } from 'react-router-dom';
// import { QuickActionMenu } from '../Dashboard';
import { StudentNavBar } from '../NavigationBar';
import { TopBanner } from '../TopBanner';
import { userType } from '../../types';

const ProtectedRoute = ({ user, isAuthenticated, noHeader, showBanner, navType, component: Component, ...rest }) => {
  localStorage.lastUrl = JSON.stringify(rest.location);
  return (
    <Route
      {...rest}
      protected
      render={props =>
        (isAuthenticated ? (
          <React.Fragment>
            {['complete-profile', 'class'].includes(rest.location.pathname.split('/')[1]) ||
            (user.grade && user.school_id && !user.get_email) ? (
              <React.Fragment>
                <header className="hbw-header">
                  {showBanner && <TopBanner />}
                  {!noHeader && <StudentNavBar navType={navType} />}
                </header>
                <main
                  className={classNames('hbw-content', 'animated', 'fadeIn', {
                    showHeader: !noHeader,
                    showBanner,
                  })}
                >
                  <Component {...props} />
                </main>
                {/* <QuickActionMenu history={props.history} /> */}
              </React.Fragment>
            ) : (
              <Redirect to="/complete-profile" />
            )}
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        ))
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: userType.isRequired,
  noHeader: PropTypes.bool,
  showBanner: PropTypes.bool,
  navType: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  noHeader: false,
  showBanner: false,
  navType: 'default',
};

const mapStateToProps = state => ({
  user: state.toJS().user.loggedUser,
  isAuthenticated: !!localStorage.token || !!state.toJS().user.loggedUser.id,
});

export default connect(mapStateToProps)(ProtectedRoute);
