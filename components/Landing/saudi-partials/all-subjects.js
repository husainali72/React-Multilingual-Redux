import React from 'react';
import { Row } from '../../Layout';
import { translationText, Serializer } from '../../../helpers';

export default function AllSubjects(prop) {
  const hbwText = prop.hbwText;
  return (
    <section className="allsubjects-sec">
      <img src="/assets/images/subject-icons.png" className="allsubject_img" />
      <div className="allsubject-wrapper">
        <div className="allsubject-image">
          <img src="/assets/images/NewUi/group-31760.png" />
        </div>
        <div className="allsubject-content">
          <img src="/assets/images/NewUi/dashed.png" className="dashed" />
          <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.allsubjectsHeading')}</h2>
          <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.allsubjectsSubheading')}</h4>
          <img src="/assets/images/NewUi/group-33845.png" className="btn-sub-sec" />
        </div>
      </div>
    </section>
  );
}

// <Row>
//         <div className="col-md-12 col-sm-12 col-xs-12 text-center">
//           <img src="/assets/images/NewUi/group-31760.png" className="desktop-img" />
//         </div>
//         <div className="col-md-12 col-sm-12 col-xs-12 text-center">
//           <img src="/assets/images/NewUi/dashed.png" className="dashed" />
//           <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.allsubjectsHeading')}</h2>
//           <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.allsubjectsSubheading')}</h4>
//           <img src="/assets/images/NewUi/group-33845.png" className="btn-sub-sec" />
//         </div>
//       </Row>
