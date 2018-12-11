import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
import { Link, withRouter } from 'react-router-dom';
import Popover from 'react-popover';
import Notifications from '../Notifications';
import NavigationMenu from '../NavigationMenu';
import Icon from '../../components/Icon';
import { LOGGED_OUT_USER } from '../../redux/constants';
import { userType } from '../../types';
import { translationText } from '../../helpers';
import { Row, Avatar, Column, Vr, Flex, Button } from '../Layout';
import MobileSidebar from '../Sidebar/mobileSidebar';

class StudentNavBar extends Component {
  static propTypes = {
    loggedOut: PropTypes.func.isRequired,
    user: userType.isRequired,
    navType: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    /* eslint-disable react/prop-types */
    this.state = {
      showUserOptions: false,
      navType: props.navType,
      navItems: this.getNavItems(props),
      showMobileSidebar: false,
    };
  }

  componentWillReceiveProps(nextProp) {
    const { navType, location } = nextProp;
    if (navType !== this.props.navType) {
      this.setState({
        navType,
        navItems: this.getNavItems(nextProp),
      });
    }
    if (location.pathname !== this.props.location.pathname) {
      this.toggleUserOptions(false);
    }
  }

  componentWillUnmount() {
    this.setState(() => ({}));
  }

  getNavItems = () => {
    return [
      {
        label: 'tab.main',
        url: '/home',
        icon: 'home',
      },
    ];
  };

  toggleUserOptions = (flag = undefined) => {
    this.setState({ showUserOptions: flag !== undefined ? flag : !this.state.showUserOptions });
  };

  toggleMobileSidebar = () => {
    this.setState(prevState => ({ showMobileSidebar: !prevState.showMobileSidebar }));
  };

  logout = () => {
    /* eslint-disable react/prop-types */
    this.props.loggedOut();
    this.props.history.push('/');
  };

  render() {
    const { user, hbwText, history } = this.props;
    const { showUserOptions, navItems, showMobileSidebar } = this.state;
    const isRtl = document.body.dir === 'rtl';

    const popoverProps = {
      isOpen: showUserOptions,
      preferPlace: 'below',
      onOuterAction: () => this.toggleUserOptions(false),
      body: (
        <ul className="hbw-list">
          <li>
            <Icon name="user" height="16px" />
            <Link to="/profile">{translationText(hbwText, 'tab.profilePage')}</Link>
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
        {showMobileSidebar && (
          <MobileSidebar
            hbwText={hbwText}
            history={history}
            logout={this.logout}
            user={user}
            onClose={() => this.toggleMobileSidebar()}
          />
        )}
        {isMobileOnly ? (
          <Row nowrap className="hbw-navigation-bar">
            <Row nowrap align="center" flex="1">
              <div className="hbw-user-menu">
                <Row align="center" onClick={() => this.toggleMobileSidebar()}>
                  <Avatar url={user.profile_pic} gender={user.gender} />
                </Row>
              </div>
            </Row>
            <Link to="/home" className="hbw-brand">
              <Icon name="logo" />
            </Link>
            <Row justify="end" nowrap flex="1">
              <Notifications />
            </Row>
          </Row>
        ) : (
          <Row nowrap className="hbw-navigation-bar">
            <Link to="/" className="hbw-brand">
              {isRtl ? <Icon name="hbw-ar" /> : <Icon name="hbw-en" />}
            </Link>
            <Row flex="1" className="nav-menu-wrapper">
              {!!navItems.length && <NavigationMenu items={navItems} hbwText={hbwText} />}
            </Row>
            <Flex />
            <Vr />
        <Notifications />
        <div className="hbw-user-menu">
          <Popover {...popoverProps}>
            <Row align="center" onClick={() => this.toggleUserOptions()}>
              <Avatar url={user.profile_pic} gender={user.gender} />
              <Column className="nav-profile-info">
                <div className="title" title={user.name}>
                  {user.name}
                </div>
                {user.school && user.school.name && <span className="subtitle">{user.school.name}</span>}
              </Column>
              <Button fab outlined icon="arrow-down" size="tiny" className="mlr-05" />
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
  )(StudentNavBar),
);
