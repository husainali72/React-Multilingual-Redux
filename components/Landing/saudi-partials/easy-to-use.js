import React from 'react';
import { Row } from '../../Layout';
import { translationText, Serializer } from '../../../helpers';

export default function EasyToUse(prop) {
  const hbwText = prop.hbwText;
  return (
    <section className="easytouse-sec">
      <div className="easytouse-wrapper">
        <div className="easytouse-heading">
          <img src="/assets/images/NewUi/dashed.png" className="dashed" />
          <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.easytouseHeading')}</h2>
          <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.easyToUseSubheading')}</h4>
        </div>

        <div className="easytouse-image">
          <div className="image-outer">
            <img src="/assets/images/NewUi/group-31753.png" />
            <a href="#">
              <img src="/assets/images/NewUi/group-34793.png" className="overlay-img" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// <section className="easytouse-sec">
// <div className="container-fluid">
//   <Row>
//     <div className="col-md-12 col-sm-12 col-xs-12 text-center">
//       <img src="/assets/images/NewUi/dashed.png" className="dashed" />
//       <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.easytouseHeading')}</h2>
//       <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.easyToUseSubheading')}</h4>
//     </div>
//     <div className="col-md-12 col-sm-12 col-xs-12">
//       <div className="image-outer">
//         <img src="/assets/images/NewUi/group-31753.png" />
//         <a href="#">
//           <img src="/assets/images/NewUi/group-34793.png" className="overlay-img" />
//         </a>
//       </div>
//     </div>
//   </Row>
// </div>
// </section>
