import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { DropDownMenu } from '../DropDownMenu';
import { translationType } from '../../types';
import { translationText } from '../../helpers';
import { LIST_COUNTRY } from '../../redux/constants';

class EgyptLanding extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    countries: PropTypes.shape({
      countryList: PropTypes.array,
      selectedCountry: PropTypes.object,
    }).isRequired,
    updateCountries: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { id: 0, full_name: '', name: '' }, // default selected value
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(option) {
    this.setState({ selectedOption: option });
    const countries = JSON.parse(localStorage.getItem('country'));
    countries.selectedCountry = option;
    localStorage.language = option.locale;
    this.props.updateCountries(countries);

    /* eslint-disable react/prop-types */
    if (option.id === 1) {
      this.props.history.replace('/');
    } else if (option.id === 123) {
      this.props.history.replace('/global');
    }
  }

  render() {
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;
    const { countries } = this.props;
    const pathName = window.location.pathname.replace('/', '');
    let stateValue = 0;
    if (pathName === 'egypt2') {
      stateValue = 2;
    } else if (pathName === 'egypt3') {
      stateValue = 3;
    } else {
      stateValue = 1;
    }
    const style = [
      {
        fontColor: {
          color: 'black',
        },
        imageWrapper: {
          padding: '4px',
          borderRadius: '2px',
          border: '1px dashed #fff',
          height: '24px',
          display: 'inline-block',
          verticalAlign: 'top',
          cursor: 'pointer',
        },
        title: {
          display: 'inline-block',
          color: '#ffffff',
          fontSize: '12px',
          margin: '0px 8px 0 0',
          textShadow: '1px 2px 4px #333',
          verticalAlign: 'top',
          cursor: 'pointer',
        },
        imgWidth: {
          width: '25px',
          verticalAlign: 'top',
        },
        position: {
          position: 'relative',
        },
        dropDownList: {
          right: '0px',
          left: 'auto',
          color: '#626262',
          height: 'auto',
          width: 'auto',
          minWidth: '100px',
          position: 'absolute',
          top: '100%',
          zIndex: '1000',
          float: 'left',
          margin: '2px 0 0',
          fontSize: '14px',
          textAlign: 'left',
          listStyle: 'none',
          backgroundColor: '#fff',
          border: '1px solid rgba(0,0,0,.15)',
          borderRadius: '4px',
          WebkitBoxShadow: '0 6px 12px rgba(0,0,0,.175)',
          boxShadow: '0 6px 12px rgba(0,0,0,.175)',
        },
        imgLi: {
          width: '25px',
          marginLeft: '5px',
          display: 'inline-block',
        },
        titleLi: {
          display: 'inline-block',
        },
        dropDownLi: {
          textAlign: 'center',
          fontSize: '13px',
          padding: '5px 5px',
          cursor: 'pointer',
        },
        textAlignHover: {
          backgroundColor: '#fafafa',
        },
        titleHead: {
          padding: '5px',
        },
        arrow: {
          width: '18px',
          margin: '0 9px',
        },
        caret: {
          position: 'absolute',
          top: '-13px',
          color: '#ffffff',
          fontSize: '20px',
          left: '10%',
        },
      },
    ];
    return (
      <div>
        <div className="egypt-landing">
          <section className={`hero-section ${stateValue === 2 ? 'second' : ''}`}>
            <div className="egypt-landing-heading">
              <div className="heading-logo">
                <img src="/assets/images/hbw-logo-gradient.png" alt="" />
              </div>
              <div className="heading-country">
                {!isEmpty(countries) &&
                  countries.countryList.length > 0 && (
                    <DropDownMenu
                      list={countries.countryList}
                      value1="full_name"
                      value2="flag"
                      selected={this.state.selectedOption}
                      onChange={this.onChange}
                      styles={style}
                    />
                  )}
              </div>
              {/* <div className="locale hide">
                <span ng-if="locale=='ar_EG'" className="english" ng-click="vm.changeLocation('en_EG')">EN</span>
                <span ng-if="locale!=='ar_EG'" className="arabic" ng-click="vm.changeLocation('ar_EG')">AR</span>
              </div> */}
            </div>

            <div className="header-content">
              <div className="header-content1">
                <h6 className="heading">
                  {stateValue === 1 && <span>{translationText(hbwText, 'egypt.mainheading')}</span>}
                  {stateValue === 2 && <span>{translationText(hbwText, 'egypt.mainheading2')}</span>}
                  {stateValue === 3 && <span>{translationText(hbwText, 'egypt.mainheading3')}</span>}
                </h6>
                <p className="subheading">
                  {stateValue === 1 && <span>{translationText(hbwText, 'egypt.headingContent')}</span>}
                  {stateValue === 2 && <span>{translationText(hbwText, 'egypt.headingContent2')}</span>}
                  {stateValue === 3 && <span>{translationText(hbwText, 'egypt.headingContent3')}</span>}
                </p>
              </div>
              <div className="app-links">
                <a
                  className="app-link app-link--google"
                  href="#"
                >
                  <img src="/assets/images/play-store.png" alt="" />
                </a>
                <a className="app-link app-link--apple" href="#">
                  <img src="/assets/images/app-store.png" alt="" />
                </a>
              </div>
              <div className="subscribe-form light hide">
                <div className="form-button">
                  <a type="button" className="white-bordered-button">
                    {translationText(hbwText, 'egypt.headerButton')}
                  </a>
                </div>
              </div>
            </div>

            <img className="clip-down" src="/assets/images/clip-down.png" alt="" />

            <div className="side-icons">
              <span> {translationText(hbwText, 'egypt.followUs')}</span>
              <div className="vertical-line" />
              <div className="social-icons">
                <a href="" target="_blank">
                  <img src="/assets/images/fb-shadowed.png" className="fb-icon" alt="" />
                </a>
                <a href="" target="_blank">
                  <img src="/assets/images/insta-shadowed.png" className="insta-icon" alt="" />
                </a>
              </div>
            </div>
          </section>

          <section className="feature-section">
            <div className="section-title">
              {stateValue === 1 && <span>{translationText(hbwText, 'egypt.featureHeading')}</span>}
              {stateValue === 2 && <span>{translationText(hbwText, 'egypt.featureHeading2')}</span>}
              {stateValue === 3 && <span>{translationText(hbwText, 'egypt.featureHeading')}</span>}
            </div>
            <div className="section-subtitle">{translationText(hbwText, 'egypt.featureSubheading')}</div>

            <div className="feature-table">
              <div className="border-overlay" />
              <div className="feature-block">
                <div className="feature-item one">
                  <div className="feature-content">
                    <div className="feature-name">{translationText(hbwText, 'egypt.feature1')}</div>
                    <div className="feature-desc">{translationText(hbwText, 'egypt.feature1Description')}</div>
                  </div>
                  <i className="feature-icon feature1" />
                </div>
                <div className="feature-item two">
                  <div className="feature-content">
                    <div className="feature-name">{translationText(hbwText, 'egypt.feature2')}</div>
                    <div className="feature-desc">{translationText(hbwText, 'egypt.feature2Description')}</div>
                  </div>
                  <i className="feature-icon feature2" />
                </div>
              </div>
              <div className="feature-block">
                <div className="feature-item">
                  <div className="feature-content">
                    <div className="feature-name">{translationText(hbwText, 'egypt.feature3')}</div>
                    <div className="feature-desc">{translationText(hbwText, 'egypt.feature3Description')}</div>
                  </div>
                  <i className="feature-icon feature3" />
                </div>
                <div className="feature-item">
                  <div className="feature-content">
                    <div className="feature-name">{translationText(hbwText, 'egypt.feature4')}</div>
                    <div className="feature-desc">{translationText(hbwText, 'egypt.feature4Description')}</div>
                  </div>
                  <i className="feature-icon feature4" />
                </div>
              </div>
              <div className="feature-block">
                <div className="feature-item">
                  <div className="feature-content">
                    <div className="feature-name">{translationText(hbwText, 'egypt.feature5')}</div>
                    <div className="feature-desc">{translationText(hbwText, 'egypt.feature5Description')}</div>
                  </div>
                  <i className="feature-icon feature5" />
                </div>
                <div className="feature-item">
                  <div className="feature-content">
                    <div className="feature-name">{translationText(hbwText, 'egypt.feature6')}</div>
                    <div className="feature-desc">{translationText(hbwText, 'egypt.feature6Description')}</div>
                  </div>
                  <i className="feature-icon feature6" />
                </div>
              </div>
            </div>
          </section>

          <section className="second-banner">
            <div className="content">
              <h5>
                {stateValue === 1 && <span>{translationText(hbwText, 'egypt.banner2Heading')}</span>}
                {stateValue === 2 && <span>{translationText(hbwText, 'egypt.banner2Heading2')}</span>}
                {stateValue === 3 && <span>{translationText(hbwText, 'egypt.banner2Heading3')}</span>}
              </h5>
              <p>
                {stateValue === 1 && <span>{translationText(hbwText, 'egypt.banner2Subheading')}</span>}
                {stateValue === 2 && <span>{translationText(hbwText, 'egypt.banner2Subheading2')}</span>}
                {stateValue === 3 && <span>{translationText(hbwText, 'egypt.banner2Subheading3')}</span>}
              </p>
              <div className="link-wrapper">
                <a href="#" target="_blank">
                  <img src="/assets/images/app-store-ar.png" alt="app store" />
                </a>
                <a href="#" target="_blank">
                  <img src="/assets/images/play-store-ar.png" alt="play store" />
                </a>
              </div>
            </div>
            <img className="clip-top" src="/assets/images/clip-down.png" alt="" />
            <img className="clip-down" src="/assets/images/clip-down.png" alt="" />
          </section>

          <section className="mobile-image-section">
            <div className="pattern-wrapper">
              <div className="bg-pattern-2" />
              <div className="bg-pattern-3" />
            </div>

            <img className="main-image" src="/assets/images/egypt-phones.png" alt="" />
            <span id="submitForm" className="submit-form">
              <h6>
                <span>{translationText(hbwText, 'egypt.downloadAppNow')}</span>
              </h6>
              <div className="app-links">
                <a
                  className="app-link app-link--google"
                  href="#"
                >
                  <img src="/assets/images/play-store.png" alt="" />
                </a>
                <a className="app-link app-link--apple" href="#">
                  <img src="/assets/images/app-store.png" alt="" />
                </a>
              </div>
            </span>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  countries: state.toJS().folder.countries,
});

const mapDispatchToProps = dispatch => ({
  updateCountries: countries => dispatch({ type: LIST_COUNTRY.SUCCESS, payload: countries }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EgyptLanding),
);
