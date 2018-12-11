import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { translationText } from '../../helpers';
import { Button } from '../Layout';
import { translationType, userType } from '../../types';

class Footer extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    user: userType,
  };

  static defaultProps = {
    user: null,
  };

  setLocale = (locale) => {
    localStorage.setItem('language', locale);
    window.location.reload();
  };

  render() {
    const locale = localStorage.getItem('language') || 'ar';
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;
    const pathName = window.location.pathname.replace('/', '');
    let isContentForm = false;
    if (pathName === 'global') {
      isContentForm = true;
    }
    const right_links_footer = ['right-links-footer col-sm-8 col-md-8 col-xs-12'];
    if (locale === 'ar_EG' || locale === 'ar') {
      right_links_footer.push('ar_EG');
    }

    const logo_column_footer = ['logo-column-footer col-sm-4'];
    if (locale === 'ar_EG' || locale === 'ar') {
      logo_column_footer.push('ar_EG');
    }

    const hbw_links_footer = ['hbw-links-footer col-sm-4'];
    if (locale === 'ar_EG' || locale === 'ar') {
      hbw_links_footer.push('ar_EG');
    }

    const important_links_footer = ['important-links-footer col-sm-4'];
    if (locale === 'ar_EG' || locale === 'ar') {
      important_links_footer.push('ar_EG');
    }

    const copyright_info = ['copyright-info'];
    if (locale === 'ar_EG' || locale === 'ar') {
      copyright_info.push('ar_EG_Copy');
    }

    return (
      <section className="footer">
        {isContentForm && (
          <div>
            <div className="content-form">
              <span className="subheading">
                Our passion is to solve the problems plaguing education, we aim to spread our vision across the globe.
                <br /> Join us if you share our passion!
              </span>
              <div className="form">
                <div className="form-item">
                  <img src="/assets/images/msg-icon.png" alt="" />
                  <input type="text" name="name" className="form-control" placeholder="Your email adress" />
                </div>
                <div className="form-item">
                  <button className="join-button">Join The Team!</button>
                </div>
              </div>
            </div>

            <div className="footer-images hidden-xs clearfix">
              <img src="/assets/images/left-footer.png" alt="" className="left-image" />
              <img src="/assets/images/right-footer.png" alt="" className="right-image" />
            </div>
          </div>
        )}

        <footer className="main-footer">
          <div className="footer-container row">
            <div className={right_links_footer.join(' ')}>
              <div className="footer-links-row">
                <div className={logo_column_footer.join(' ')}>
                  <div className="logo">
                    <Link to="/">
                      <img src="/assets/images/website-icon.svg" alt="" />
                    </Link>
                  </div>
                </div>
                <div className={important_links_footer.join(' ')}>
                  <p className="footer-list-heading">{translationText(hbwText, 'home.importantLinks')}</p>
                  {!this.props.user && (
                    <ul>
                      <li>
                        <Link to="/signup">{translationText(hbwText, 'tab.signup')}</Link>
                      </li>
                      <li>
                        <Link to="/login">{translationText(hbwText, 'tab.login')}</Link>
                      </li>
                    </ul>
                  )}
                  <div className="change-locale">
                    {locale === 'ar' ? (
                      <Button type="primary" size="md" onClick={this.setLocale.bind(this, 'en')}>
                        English
                      </Button>
                    ) : (
                      <Button type="primary" size="md" onClick={this.setLocale.bind(this, 'ar')}>
                        العربية
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="left-links-footer col-sm-4 col-md-4 col-xs-12">
              <div className="clearfix">
                <div className="otherLinks clearfix">
                  <div className="social-links icon-rotate">
                    <a className="btn-tw" href="#" target="_blank">
                      {translationText(hbwText, 'home.twitter')}
                      <i className="fa fa-twitter" />
                    </a>
                    <a className="btn-fb" href="#" target="_blank">
                      {translationText(hbwText, 'home.fb')}
                      <i className="fa fa-facebook" />
                    </a>
                    <a className="btn-inst" href="#" target="_blank">
                      {translationText(hbwText, 'home.insta')}
                      <i className="fa fa-instagram" />
                    </a>
                    <a className="btn-yt" href="#" target="_blank">
                      {translationText(hbwText, 'home.ytube')}
                      <i className="fa fa-youtube-play" />
                    </a>
                  </div>
                  <div className="btn-wrap">
                    <Link to="/faq" className="hbw-button filled btn-faq">
                      {translationText(hbwText, 'home.faq')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={copyright_info.join(' ')}>
            <p>{translationText(hbwText, 'home.copyRight')}</p>
            &nbsp; | &nbsp;
            <Link to="/tos">{translationText(hbwText, 'home.tos')}</Link>
          </div>
        </footer>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  user: state.toJS().user.loggedUser,
});

export default connect(mapStateToProps)(Footer);
