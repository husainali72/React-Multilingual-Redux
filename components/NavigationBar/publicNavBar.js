import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { isMobile } from 'react-device-detect';
import Popover from 'react-popover';
import Icon from '../Icon';
import NavigationMenu from '../NavigationMenu';
import { Row, Flex, Vr, Button, Avatar, Column, Hr, HBWLink } from '../Layout';
import { LOGGED_OUT_USER } from '../../redux/constants';
import { translationText } from '../../helpers';
import { userType, translationType } from '../../types';

class PublicNavBar extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    user: userType.isRequired,
    loggedOut: PropTypes.func.isRequired,
    location: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.items = [
      {
        label: 'home.dashboardTitle',
        url: '/',
        icon: 'home',
      },
    ];
    this.state = {
      showUserOptions: false,
    };
  }

  componentWillReceiveProps({ location }) {
    if (!isEmpty(location) && location !== this.props.location) {
      this.setState({ showUserOptions: false });
    }
  }

  componentWillUnmount() {
    this.setState(() => ({}));
  }

  setLocale(locale) {
    localStorage.setItem('language', locale);
    window.location.reload();
  }

  toggleUserOptions = (flag = undefined) => {
    this.setState(prevState => ({
      showUserOptions: flag !== undefined ? flag : !prevState.showUserOptions,
    }));
  };

  logout = () => {
    /* eslint-disable react/prop-types */
    this.props.loggedOut();
    this.props.history.push('/');
  };

  render() {
    const { user, hbwText } = this.props;
    const isRtl = document.body.dir === 'rtl';
    const { showUserOptions } = this.state;
    const popoverProps = {
      isOpen: showUserOptions,
      preferPlace: 'below',
      onOuterAction: () => this.toggleUserOptions(false),
      body: (
        <ul className="hbw-list">
          {this.items.map(item => (
            <li key={item.label}>
              <Icon name={item.icon} height="16px" />
              <Link to={item.url}>{translationText(hbwText, item.label)}</Link>
            </li>
          ))}
          <li className="seperator">
            <Hr />
          </li>
          <li onClick={this.logout}>
            <i className="fa fa-sign-out" />
            <span>{translationText(hbwText, 'tab.logOut')}</span>
          </li>
        </ul>
      ),
    };

    return (
      <React.Fragment>
        {!isMobile ? (
          <Row nowrap className="hbw-navigation-bar">
            <Link to="/" className="hbw-brand">
              {/* {isRtl ? <Icon name="hbw-ar" /> : <Icon name="hbw-en" />} */}
              <img src="/assets/images/hbw-logo-gradient.png" alt="" />
            </Link>
            <Vr />
            <NavigationMenu items={this.items} hbwText={hbwText} />
            <Flex />
            {isEmpty(user) ? (
              <Row justify="space">
                <HBWLink to="/login" type="primary" size="large" outlined>
                  {translationText(hbwText, 'tab.login')}
                </HBWLink>
                <HBWLink to="/signup" type="primary" size="large">
                  {translationText(hbwText, 'tab.signup')}
                </HBWLink>
              </Row>
            ) : (
              <React.Fragment>
                <div className="nav-login-button-wrapper">
                  <Button to="/home" type="primary" size="large">
                    {translationText(hbwText, 'tab.dashboard')}
                  </Button>
                </div>
                <Vr />
                <div className="hbw-user-menu">
                  <Popover {...popoverProps}>
                    <Row align="center" onClick={() => this.toggleUserOptions()}>
                      <Avatar url={user.profile_pic} gender={user.gender} />
                      <Column className="nav-profile-info">
                        <div className="title" titlr={user.name}>
                          {user.name}
                        </div>
                        {user.school && user.school.name && <span className="subtitle">{user.school.name}</span>}
                      </Column>
                      <Button fab outlined icon="arrow-down" size="tiny" className="mlr-05" />
                    </Row>
                  </Popover>
                </div>
              </React.Fragment>
            )}
          </Row>
        ) : (
          <Row nowrap className="hbw-navigation-bar">
            <Link to="/" className="hbw-brand">
              {/* <Icon name="logo" /> */}
              <img src="/assets/images/hbw-logo-gradient.png" alt="" />
            </Link>
            <Flex />
            {isEmpty(user) ? (
              <Row justify="space-sm">
                <Button to="/login" type="primary" outlined>
                  {translationText(hbwText, 'tab.login')}
                </Button>
                <Button to="/signup" type="primary">
                  {translationText(hbwText, 'tab.signup')}
                </Button>
              </Row>
            ) : (
              <React.Fragment>
                <Button to="/home" type="primary">
                  {translationText(hbwText, 'tab.dashboard')}
                </Button>
              </React.Fragment>
            )}
            <div className="hbw-user-menu">
              <Popover {...popoverProps}>
                <Row align="center" onClick={() => this.toggleUserOptions()}>
                  {isEmpty(user) ? (
                    <Button fab type="primary" outlined icon="menu" size="md" />
                  ) : (
                    <Avatar url={user.profile_pic} gender={user.gender} />
                  )}
                </Row>
              </Popover>
            </div>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  user: state.toJS().user.loggedUser,
});

const mapDispatchToProps = dispatch => ({
  loggedOut: () => dispatch({ type: LOGGED_OUT_USER.REQUEST }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PublicNavBar),
);
