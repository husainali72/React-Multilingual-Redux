import React from 'react';
import { Row } from '../../Layout';
import { translationText, Serializer } from '../../../helpers';

export default function AllInOne(prop) {
  const hbwText = prop.hbwText;
  return (
    <section className="feature-section">
      <div className="feature-heading">
        <img src="/assets/images/NewUi/dashed.png" className="dashed" />
        <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.allinoneHeading')}</h2>
        <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.allinoneSubheading')}</h4>
      </div>
      <div className="feature-table">
        <div className="border-overlay" />
        <div className="feature-block">
          <div className="feature-item">
            <i className="feature-icon feature5" />

            <div className="feature-content">
              <div className="feature-name">{translationText(hbwText, 'saudiLanding.templateHeading')}</div>
              <div className="feature-desc">{translationText(hbwText, 'saudiLanding.templateSubheading')}</div>
            </div>
          </div>
          <div className="feature-item">
            <i className="feature-icon feature6" />
            <div className="feature-content">
              <div className="feature-name">{translationText(hbwText, 'saudiLanding.drillsHeading')}</div>
              <div className="feature-desc">{translationText(hbwText, 'saudiLanding.drillsSubheading')}</div>
            </div>
          </div>
        </div>

        <div className="feature-block">
          <div className="feature-item">
            <i className="feature-icon feature3" />

            <div className="feature-content">
              <div className="feature-name">{translationText(hbwText, 'saudiLanding.electronicHeading')}</div>
              <div className="feature-desc">{translationText(hbwText, 'saudiLanding.fatigueHeading')}</div>
            </div>
          </div>
          <div className="feature-item">
            <i className="feature-icon feature4" />

            <div className="feature-content">
              <div className="feature-name">{translationText(hbwText, 'saudiLanding.interactiveHeading')}</div>
              <div className="feature-desc">{translationText(hbwText, 'saudiLanding.interactiveSubheading')}</div>
            </div>
          </div>
        </div>

        <div className="feature-block">
          <div className="feature-item">
            <i className="feature-icon feature1" />
            <div className="feature-content">
              <div className="feature-name">{translationText(hbwText, 'saudiLanding.educationHeading')}</div>
              <div className="feature-desc">{translationText(hbwText, 'saudiLanding.educationSubheading')}</div>
            </div>
          </div>
          <div className="feature-item">
            <i className="feature-icon feature2" />
            <div className="feature-content">
              <div className="feature-name">{translationText(hbwText, 'saudiLanding.organizeHeading')}</div>
              <div className="feature-desc">{translationText(hbwText, 'saudiLanding.organizeSubheading')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <section className="allinone-sec">
      <Row>
        <img src="/assets/images/border-line.png" className="path-img-desktop" />
        <img src="/assets/images/border-line-h.png" className="path-img-mobile" />
        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
          <img src="/assets/images/NewUi/dashed.png" className="dashed" />
          <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.allinoneHeading')}</h2>
          <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.allinoneSubheading')}</h4>
        </div>

        <div className="container-allinone">
          <div className="col-md-4 col-sm-6 col-xs-6 inner-allinone">
            <div className="feature-left">
              <h3 className="feat-title">{translationText(hbwText, 'saudiLanding.educationHeading')}</h3>
              <p className="feat-disc">{translationText(hbwText, 'saudiLanding.educationSubheading')}</p>
            </div>
            <div className="feature-right">
              <img src="/assets/images/feature9.png" className="icon" />
            </div>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-6 inner-allinone">
            <div className="feature-left">
              <h3 className="feat-title">{translationText(hbwText, 'saudiLanding.electronicHeading')}</h3>
              <p className="feat-disc">{translationText(hbwText, 'saudiLanding.fatigueHeading')}</p>
            </div>
            <div className="feature-right">
              <img src="/assets/images/feature3.png" className="icon" />
            </div>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-6 inner-allinone">
            <div className="feature-left">
              <h3 className="feat-title">{translationText(hbwText, 'saudiLanding.templateHeading')}</h3>
              <p className="feat-disc">{translationText(hbwText, 'saudiLanding.templateSubheading')}</p>
            </div>
            <div className="feature-right">
              <img src="/assets/images/NewUi/group-11217.png" className="icon" />
            </div>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-6 inner-allinone">
            <div className="feature-left">
              <h3 className="feat-title">{translationText(hbwText, 'saudiLanding.organizeHeading')}</h3>
              <p className="feat-disc">{translationText(hbwText, 'saudiLanding.organizeSubheading')}</p>
            </div>
            <div className="feature-right">
              <img src="/assets/images/feature-8.png" className="icon" />
            </div>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-6 inner-allinone">
            <div className="feature-left">
              <h3 className="feat-title">{translationText(hbwText, 'saudiLanding.interactiveHeading')}</h3>
              <p className="feat-disc">{translationText(hbwText, 'saudiLanding.interactiveSubheading')}</p>
            </div>
            <div className="feature-right">
              <img src="/assets/images/feature4.png" className="icon" />
            </div>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-6 inner-allinone">
            <div className="feature-left">
              <h3 className="feat-title">{translationText(hbwText, 'saudiLanding.drillsHeading')}</h3>
              <p className="feat-disc">{translationText(hbwText, 'saudiLanding.drillsSubheading')}</p>
            </div>
            <div className="feature-right">
              <img src="/assets/images/feature6.png" className="icon" />
            </div>
          </div>
        </div>
      </Row>
    </section> */
}
