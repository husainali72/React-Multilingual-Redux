import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translationText } from '../../helpers';
import { translationType } from '../../types';
import './not-found.scss';

class NotFound extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
  };

  render() {
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;
    return (
      <div className="mobile-ad-container">
        <div className="main-area">
          <div className="logo">
            <Link to="/">
              <img src="/assets/images/hbw-logo-gradient.png" alt="" />
            </Link>
          </div>
          <section className="normal-view">
            <div className="text">
              <h5>
                <span>{translationText(hbwText, 'mobileAd.heading')}</span>
              </h5>
              <p>
                <span>{translationText(hbwText, 'mobileAd.subheading')}</span>
              </p>
            </div>
            <div className="link-wrapper">
              {localStorage.getItem('language') === 'en' && (
                <a className="link" href="#" target="_blank">
                  <img src="/assets/images/app-store.png" alt="app store" />
                </a>
              )}
              {localStorage.getItem('language') === 'ar' && (
                <a className="link" href="#" target="_blank">
                  <img src="/assets/images/app-store-ar.png" alt="app store" />
                </a>
              )}

              {localStorage.getItem('language') === 'en' && (
                <a
                  className="link"
                  href="#"
                  target="_blank"
                >
                  <img src="/assets/images/play-store.png" alt="play store" />
                </a>
              )}
              {localStorage.getItem('language') === 'ar' && (
                <a
                  className="link"
                  href="#"
                  target="_blank"
                >
                  <img src="/assets/images/play-store-ar.png" alt="play store" />
                </a>
              )}
              <Link to="/" className="link home">
                <i className="fa fa-home" />
                {translationText(hbwText, 'home.dashboardTitle')}
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
});

export default connect(mapStateToProps)(NotFound);
