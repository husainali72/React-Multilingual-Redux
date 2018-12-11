import React from 'react';
import { Row } from '../../Layout';
import { translationText, Serializer } from '../../../helpers';

export default function Footer(prop) {
  const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;
  return (
    <div>
      <section className="footer-top">
        <div className="footer-top-wrapper">
          <div className="footer-left">
            <img src="/assets/images/NewUi/logo.png" className="footer-logo" />
          </div>
          <div className="mobile-footer">
            <div className="footer-center">
              <h5 className="footer-heading">{translationText(hbwText, 'saudiLanding.aboutHBW')}</h5>
              <ul>
                <li>{translationText(hbwText, 'aboutus.vision')}</li>
                <li>{translationText(hbwText, 'home.ourteam')}</li>
                <li>{translationText(hbwText, 'home.blog')}</li>
              </ul>
            </div>
            <div className="footer-right">
              <h5 className="footer-heading">{translationText(hbwText, 'saudiLanding.connectWithUs')}</h5>
              <ul>
                <li>{translationText(hbwText, 'saudiLanding.contactUs')}</li>
                <li>{translationText(hbwText, 'saudiLanding.functions')}</li>
                <li>{translationText(hbwText, 'home.faq')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-bottom">
        <div className="footer-bottom-wrapper">
          <div className="footer-bottom-text">
            <p>{translationText(hbwText, 'home.copyRight')}</p>
          </div>
          <div className="footer-social-link">
            <ul className="social-icons">
              <li>
                <a className="btn-inst" href="#" target="_blank">
                  <i className="fa fa-instagram" />
                </a>
              </li>
              <li>
                <a className="btn-fb" href="#" target="_blank">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a className="btn-tw" href="#" target="_blank">
                  <i className="fa fa-twitter" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

{
  /*
   <div className="col-md-12 text-center">
          <p>{translationText(hbwText, 'home.copyRight')}</p>
          <ul className="social-icons">
            <li>
              <a className="btn-inst" href="#" target="_blank">
                <i className="fa fa-instagram" />
              </a>
            </li>
            <li>
              <a className="btn-fb" href="#" target="_blank">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a className="btn-tw" href="#" target="_blank">
                <i className="fa fa-twitter" />
              </a>
            </li>
          </ul>
        </div>

  <div className="container-fluid">
          <Row>
            <div className="container-footer">
              <div className="col-md-4 col-sm-4 col-xs-4">
                <h5 className="footer-heading">{translationText(hbwText, 'saudiLanding.connectWithUs')}</h5>
                <ul>
                  <li>{translationText(hbwText, 'saudiLanding.contactUs')}</li>
                  <li>{translationText(hbwText, 'saudiLanding.functions')}</li>
                  <li>{translationText(hbwText, 'home.faq')}</li>
                </ul>
              </div>
              <div className="col-md-3 col-sm-3 col-xs-3">
                <h5 className="footer-heading">{translationText(hbwText, 'saudiLanding.aboutHBW')}</h5>
                <ul>
                  <li>{translationText(hbwText, 'aboutus.vision')}</li>
                  <li>{translationText(hbwText, 'home.ourteam')}</li>
                  <li>{translationText(hbwText, 'home.blog')}</li>
                </ul>
              </div>
              <div className="col-md-5 col-sm-5 col-xs-5">
                <img src="/assets/images/NewUi/logo.png" className="footer-logo" />
              </div>
            </div>
          </Row>
        </div> */
}
