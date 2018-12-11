import React from 'react';
import { Row, Column } from '../../Layout';
import { translationText, Serializer } from '../../../helpers';

export default function Competition(prop) {
  const hbwText = prop.hbwText;
  return (
    <section className="competition-sec">
      <div className="competition-wrapper">
        <div className="competition-content">
          <img src="/assets/images/NewUi/dashed.png" className="dashed" />
          <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.competitionHeading')}</h2>
          <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.competitionSubheading')}</h4>
          <p className="description-teacher">
            {translationText(hbwText, 'saudiLanding.competitionContent1')}
            <br />
            {translationText(hbwText, 'saudiLanding.competitionContent2')}
          </p>
        </div>
        <div className="competition-image">
          <img src="/assets/images/NewUi/group-34794.png" />
        </div>
      </div>
    </section>
  );
}

{
  /* <Row>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="right-part-competition">
              <img src="/assets/images/NewUi/dashed.png" className="dashed" />
              <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.competitionHeading')}</h2>
              <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.competitionSubheading')}</h4>
              <p>
                {translationText(hbwText, 'saudiLanding.competitionContent1')}
                <br />
                {translationText(hbwText, 'saudiLanding.competitionContent2')}
              </p>
            </div>
          </div>

          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="left-part-competition">
              <img src="/assets/images/NewUi/group-34794.png" />
            </div>
          </div>
        </Row> */
}
