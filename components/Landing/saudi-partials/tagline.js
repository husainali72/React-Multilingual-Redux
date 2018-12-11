import React from 'react';
import { translationText } from '../../../helpers';

export default function TagLine(prop) {
  const hbwText = prop.hbwText;
  return (
    <section className="tagline-sec">
      <div className="tagline-wrapper">
        <div className="tagline-image">
          <img src="/assets/images/NewUi/group-34795.png" />
        </div>
        <div className="tagline-content">
          <img src="/assets/images/NewUi/dashed.png" className="dashed" />
          <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.taglineHeading1')}</h2>
          <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.taglineSubheading')}</h4>
          <p className="description-teacher">
            {translationText(hbwText, 'saudiLanding.taglineContent1')}
            <br />
            {translationText(hbwText, 'saudiLanding.taglineContent2')}
          </p>
        </div>
      </div>
    </section>
  );
}

{
  /* <Row>
<div className="col-md-6 col-sm-12 col-xs-12">
  <div className="right-part-sec">
    <img src="/assets/images/NewUi/group-34795.png" />
  </div>
</div>

<div className="col-md-6 col-sm-12 col-xs-12">
  <div className="left-part-sec">
    <img src="/assets/images/NewUi/dashed.png" className="dashed" />
    <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.taglineHeading1')}</h2>
    <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.taglineSubheading')}</h4>
    <p>
      {translationText(hbwText, 'saudiLanding.taglineContent1')}
      <br />
      {translationText(hbwText, 'saudiLanding.taglineContent2')}
    </p>
  </div>
</div>
</Row> */
}
