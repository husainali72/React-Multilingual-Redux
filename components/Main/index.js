import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { HBWLoader } from '../Layout';
import { setAuthorizationHeader } from '../../helpers';
import {
  GET_PROFILE,
  LIST_COUNTRY,
  LOGIN_USER,
  GET_TRANSLATION,
} from '../../redux/constants';
import { DISABLE_CHAT_SUPPORT_PAGES, DO_NOT_REMOVE_TOKEN_PAGES, RTL_LOCALE } from '../../constants';
import { translationType, userType } from '../../types';

class Main extends Component {
  static propTypes = {
    user: userType.isRequired,
    hbwText: translationType.isRequired,
    children: PropTypes.node.isRequired,
    countries: PropTypes.shape().isRequired,
    getCountries: PropTypes.func.isRequired,
    updateCountries: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    updateTranslation: PropTypes.func.isRequired,
    getTranslation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    /* eslint-disable react/prop-types */
    const { pathname, search } = this.props.history.location;

    // this.updateStoreFromLocalStorage();
    this.getTranslations();
    this.getUser();
    this.processQueryToken(pathname, search);
    this.getCountryList();
    this.setLayoutDirection();
    this.zohoIntegration(pathname);

    // redirect user to home page if authenticated
    if (pathname === '/' && (localStorage.token || localStorage.loggedUser)) {
      this.props.history.replace('/home');
    }

    this.state = {
      isLoading: !localStorage.country,
    };
  }

  componentDidMount() {
    if (localStorage.translation) {
      const json = JSON.parse(localStorage.translation);
      this.props.getTranslation(json);
    }
    console.log('Build  version ', process.env.VERSION);
  }
  componentWillReceiveProps({ countries, history, user }) {
    const { search, pathname } = history.location;
    if (!isEmpty(countries) && countries !== this.props.countries) {
      localStorage.language || 'ar';
      if (history.location.pathname === '/global') {
        localStorage.language = 'en';
      }
      if (history.location.pathname === '/egypt') {
        localStorage.language = 'ar_eg';
      }
      this.setLayoutDirection();
      if (
        ['/', '/login', '/signup'].includes(history.location.pathname) &&
        countries.selectedCountry &&
        countries.selectedCountry.id === 123
      ) {
        history.replace('/global');
      }
      if (
        ['/'].includes(history.location.pathname) &&
        countries.selectedCountry &&
        countries.selectedCountry.id === 2
      ) {
        history.replace('/egypt');
      }
      this.setState({ isLoading: false });
    }
    if (
      !isEmpty(countries) &&
      history.location.pathname === '/' &&
      countries.selectedCountry &&
      countries.selectedCountry.id !== 1
    ) {
      const [selectedCountry] = countries.countryList.filter(o => o.id === 1);
      this.props.updateCountries({ countryList: countries.countryList, selectedCountry });
    }
  }

  componentWillUpdate({ history }) {
    this.zohoIntegration(history.location.pathname);
  }

  setUserInfo = () => {
    if (localStorage.loggedUser) {
      const user = JSON.parse(localStorage.loggedUser);
      window.$zoho.salesiq.visitor.name(user.name);
      window.$zoho.salesiq.visitor.email(user.email);
    }
  };

  getTranslations = () => {
    if (localStorage.globalText) {
      this.props.updateTranslation(JSON.parse(localStorage.getItem('globalText')));
    }
  };

  getCountryList = () => {
    if (localStorage.country) {
      this.props.updateCountries(JSON.parse(localStorage.country));
      return;
    }
    this.props.getCountries();
  };

  getUser = () => {
    if (localStorage.token) {
      setAuthorizationHeader(localStorage.token);
      if (localStorage.loggedUser) {
        this.props.updateUser(JSON.parse(localStorage.loggedUser));
        return;
      }
      this.props.getProfile();
    }
  };

  setLayoutDirection = () => {
    if (RTL_LOCALE.includes(localStorage.language || 'ar')) {
      document.body.dir = 'rtl';
      document.body.classList.remove('force-ltr');
    } else {
      document.body.dir = 'ltr';
      document.body.classList.add('force-ltr');
    }
  };

  updateStoreFromLocalStorage = () => {

  };

  processQueryToken = (pathname, search) => {
    // get query parameters and remove 'token' value from it
    if (search && !DO_NOT_REMOVE_TOKEN_PAGES.includes(pathname)) {
      let filteredSearch = '';
      filteredSearch = search
        .replace('?', '')
        .split('&')
        .filter((val) => {
          if (val.indexOf('token') !== -1) {
            // get token value and set authoriztion header if previously saved token !== token in query
            const token = val.split('=')[1];
            if (localStorage.token !== token) {
              setAuthorizationHeader(token);
              this.props.getProfile();
            }
            return false;
          }
          return true;
        })
        .join('&');
      if (filteredSearch) {
        filteredSearch = `?${filteredSearch}`;
      }

      this.props.history.push({
        pathname,
        search: filteredSearch,
      });
    }
  };

  zohoIntegration = (path) => {
    if (window.$zoho && path) {
      let status;
      if (DISABLE_CHAT_SUPPORT_PAGES.includes(path.split('/')[1])) {
        status = 'hide';
      } else {
        status = 'show';
      }
      if (window.$zoho.salesiq && window.$zoho.salesiq.floatbutton) {
        this.setUserInfo();
        window.$zoho.salesiq.floatbutton.visible(status);
      } else {
        setTimeout(() => {
          window.$zoho.salesiq.floatbutton.visible(status);
        }, 10000);
      }
    }
  };

  render() {
    const { noCreditModal, toggleNoCreditModal, hbwText } = this.props;
    return !this.state.isLoading ? (
        <div className="page">{this.props.children}</div>
    ) : (
      <HBWLoader />
    );
  }
}

const mapStateToProps = state => ({
  countries: state.toJS().folder.countries,
  hbwText: state.toJS().translation.hbwText,
  user: state.toJS().user.loggedUser,
});

const mapDispatchToProps = dispatch => ({
  getCountries: () => dispatch({ type: LIST_COUNTRY.REQUEST }),
  updateCountries: countries => dispatch({ type: LIST_COUNTRY.SUCCESS, payload: countries }),
  updateUser: user => dispatch({ type: LOGIN_USER.SUCCESS, payload: user }),
  getProfile: () => dispatch({ type: GET_PROFILE.REQUEST }),
  updateTranslation: data => dispatch({ type: GET_TRANSLATION.SUCCESS, payload: data }),
  getTranslation: json => dispatch({ type: GET_TRANSLATION.REQUEST, payload: json }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Main),
);
