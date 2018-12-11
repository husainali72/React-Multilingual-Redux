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
import { LOGGED_OUT_USER, LIST_COUNTRY } from '../../redux/constants';
import { translationText } from '../../helpers';
import { userType, translationType } from '../../types';
import { DropDownMenu } from '../DropDownMenu';

class PublicNavBarNew extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    user: userType.isRequired,
    loggedOut: PropTypes.func.isRequired,
    location: PropTypes.shape().isRequired,
    countries: PropTypes.oneOfType([PropTypes.object]).isRequired,
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
      active: false,
      selectedOption: { id: 0, full_name: '', name: '' }, // default selected value
    };
    this.onChange = this.onChange.bind(this);
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

  ChangeClass() {
    this.setState({ active: true });
  }

  CloseMenu() {
    this.setState({ active: false });
  }

  onChange(option) {
    this.setState({ selectedOption: option });
    const countries = JSON.parse(localStorage.getItem('country'));
    countries.selectedCountry = option;
    localStorage.language = option.locale;
    this.props.updateCountries(countries);
    window.location.reload();

    /* eslint-disable react/prop-types */
    /* if (this.props.history) {
      if (option.id === 1) {
        this.props.history.replace('/');
      } else if (option.id === 123) {
        this.props.history.replace('/global');
      }
    } */
  }

  render() {
    // const classes = classnames('mobile-menu', { active: this.state.active });

    const { user, hbwText, countries } = this.props;
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
                {/* <HBWLink to="/login" type="primary" size="large" outlined>
                  {translationText(hbwText, 'tab.login')}
                </HBWLink>
                <HBWLink to="/signup" type="primary" size="large">
                  {translationText(hbwText, 'tab.signup')}
                </HBWLink> */}
                <HBWLink to="/login" type="" className="transparent-btn" size="large">
                  {translationText(hbwText, 'tab.login')}
                </HBWLink>
                <HBWLink to="/signup" type="" className="transparent-btn" size="large">
                  {translationText(hbwText, 'tab.signup')}
                </HBWLink>
                <div className="heading-country">
                  {!isEmpty(countries) && countries.countryList.length > 0 && (
                    <DropDownMenu
                      list={countries.countryList}
                      value1="iso_code"
                      value2="flag"
                      selected={this.state.selectedOption}
                      onChange={this.onChange}
                    />
                  )}
                </div>
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
                <div className="heading-country">
                  {!isEmpty(countries) && countries.countryList.length > 0 && (
                    <DropDownMenu
                      list={countries.countryList}
                      value1="iso_code"
                      value2="flag"
                      selected={this.state.selectedOption}
                      onChange={this.onChange}
                    />
                  )}
                </div>
              </React.Fragment>
            )}
          </Row>
        ) : (
          <React.Fragment>
            <nav className="mobile-navbar">
              <div className="mobile-logo">
                <img src="/assets/images/hbw-logo-gradient.png" alt="" />
              </div>
              <div className="mobile-toggle">
                <div className="heading-country">
                  {!isEmpty(countries) && countries.countryList.length > 0 && (
                    <DropDownMenu
                      list={countries.countryList}
                      value1="iso_code"
                      value2="flag"
                      selected={this.state.selectedOption}
                      onChange={this.onChange}
                    />
                  )}
                </div>
                <a href="#" onClick={this.ChangeClass.bind(this)}>
                  <i className="fa fa-bars" />
                </a>
              </div>
            </nav>

            <div className={this.state.active ? 'mobile-menu active' : 'mobile-menu deactive'}>
              <a href="#" className="menu-close" onClick={this.CloseMenu.bind(this)}>
                <i className="fa fa-times" aria-hidden="true" />
              </a>
              <div className="mobile-menu-wrapper">
                <ul className="menu-items">
                  <li>الرئيسية</li>
                  <li>قدرات/تحصيلي</li>
                  <li>الأسعار</li>
                  <li>المعلمين</li>
                  <img src="/assets/images/NewUi/path-83628.png" />
                  {isEmpty(user) ? (
                    <React.Fragment>
                      <li>
                        <Link to="/login">{translationText(hbwText, 'tab.login')}</Link>
                      </li>
                      <li>
                        <Link to="/signup">{translationText(hbwText, 'tab.signup')}</Link>
                      </li>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <li>
                        <Link to="/home">{translationText(hbwText, 'tab.dashboard')}</Link>
                      </li>
                    </React.Fragment>
                  )}
                </ul>
              </div>
            </div>
            {/* <Row nowrap className="hbw-navigation-bar">
              <Link to="/" className="hbw-brand">
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
            </Row> */}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  user: state.toJS().user.loggedUser,
  countries: state.toJS().folder.countries,
});

const mapDispatchToProps = dispatch => ({
  loggedOut: () => dispatch({ type: LOGGED_OUT_USER.REQUEST }),
  listCountry: () => dispatch({ type: LIST_COUNTRY.REQUEST }),
  updateCountries: countries => dispatch({ type: LIST_COUNTRY.SUCCESS, payload: countries }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PublicNavBarNew),
);
