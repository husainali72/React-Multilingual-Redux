import React from 'react';
import { Row } from '../../Layout';
import { translationText, Serializer } from '../../../helpers';

export default function Conclusion(prop) {
  const hbwText = prop.hbwText;
  return (
    <section className="conclusion-sec">
      <div className="conclusion-wrapper">
        <div className="conclusion-content">
          <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.conclusionContent')}</h4>
          <img src="/assets/images/NewUi/group-33845.png" className="btn-conclusion-sec" />
        </div>
      </div>
    </section>
  );
}

/* <Row>
  <div className="col-md-12 text-center">
    <div className="conclusion-sec-inner">
        <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.conclusionContent')}</h4>
        <img src="/assets/images/NewUi/group-33845.png" className="btn-conclusion-sec" />
    </div>
  </div>
</Row> */
