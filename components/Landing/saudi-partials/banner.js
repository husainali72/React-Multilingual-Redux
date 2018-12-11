import React from 'react';
import classNames from 'classnames';
import { translationText } from '../../../helpers';

export default function HomePageBanner(prop) {
  const hbwText = prop.hbwText;
  return (
    <section className="homepage-banner">
      <div className="side-icons">
        <span>Follow Us</span>
        <div className="vertical-line" />
        <div className="social-icons">
          <a href="#" target="_blank">
            <img src="/assets/images/fb-shadowed.png" className="fb-icon" alt="" />
          </a>
          <a href="#" target="_blank">
            <img src="/assets/images/insta-shadowed.png" className="insta-icon" alt="" />
          </a>
        </div>
      </div>

      <div className="banner-caption">
        <h1 className="caption-heading">
          {translationText(hbwText, 'saudiLanding.bannerHeading1')}
          <br />
          {translationText(hbwText, 'saudiLanding.bannerHeading2')}
        </h1>
        <p className="caption-para">
          {translationText(hbwText, 'saudiLanding.bannerContent1')}
          <br />
          {translationText(hbwText, 'saudiLanding.bannerContent2')}
        </p>
        <img src="/assets/images/NewUi/group-31741.png" className="caption-btn" />
      </div>

      {/* Client  */}
      <div className="clients">
        <div className="clients-wrapper text-center">
          <img src="/assets/images/NewUi/cnn.png" alt="al Jazirah" className="client-logo" />
        </div>
        <div className="clients-wrapper text-center">
          <img src="/assets/images/alJazirah.png" alt="al Jazirah" className="client-logo" />
        </div>
        <div className="clients-wrapper text-center">
          <img src="/assets/images/press-ufm.png" alt="al Jazirah" className="client-logo" />
        </div>
        <div className="clients-wrapper text-center">
          <img src="/assets/images/press-sabq.png" alt="al Jazirah" className="client-logo" />
        </div>

        <div className="clients-wrapper text-center">
          <img src="/assets/images/takaful.png" alt="al Jazirah" className="client-logo" />
        </div>
        <div className="clients-wrapper text-center">
          <img src="/assets/images/NSA.png" alt="al Jazirah" className="client-logo" />
        </div>
      </div>
    </section>
  );
}
