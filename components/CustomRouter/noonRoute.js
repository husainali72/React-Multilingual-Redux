import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import classNames from 'classnames';
import { PublicNavBar } from '../NavigationBar';
import Footer from '../Footer';
import { TopBanner } from '../TopBanner';

const HBWRoute = ({ noFooter, noHeader, showBanner, component: Component, ...rest }) => {
  delete localStorage.lastUrl;
  return (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <header className="hbw-header">
            {showBanner && <TopBanner />}
            {!noHeader && <PublicNavBar />}
          </header>
          <main
            className={classNames('hbw-content', 'animated', 'fadeIn', {
              showHeader: !noHeader,
              showBanner,
            })}
          >
            <Component {...props} />
          </main>
          {!noFooter && <Footer />}
        </React.Fragment>
      )}
    />
  );
};

HBWRoute.propTypes = {
  component: PropTypes.func.isRequired,
  noFooter: PropTypes.bool,
  noHeader: PropTypes.bool,
  showBanner: PropTypes.bool,
};

HBWRoute.defaultProps = {
  noFooter: false,
  noHeader: false,
  showBanner: false,
};

export default HBWRoute;
