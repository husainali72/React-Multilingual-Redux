import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LIST_TEACHERS } from '../../../redux/constants';
import { Row } from '../../Layout';
import { translationText, Serializer } from '../../../helpers';

export default function Testimonials(prop) {
  const hbwText = prop.hbwText;
  return (
    <section className="testimonials-sec">
      <div className="testimonials-heading">
        <div className="testimonials-heading-wrapper">
          <img src="/assets/images/NewUi/dashed.png" className="dashed" />
          <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.testimonialsHeading')}</h2>
          <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.testimonialsSubheading')}</h4>
        </div>
      </div>
      <div className="testimonials-wrapper">
        <div className="testimonials-image">
          <img src="/assets/images/NewUi/image-560.png" />
        </div>
        <div className="testimonials-content">
          <div className="testimonials-inner-content">
            <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.storySubheading')}</h4>
            <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.storyHeading')}</h2>
            <p className="description-teacher">{translationText(hbwText, 'saudiLanding.storyContent1')}</p>
            <span>{translationText(hbwText, 'saudiLanding.storyContent2')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  totalStudents: state.toJS(),
});

const mapDispatchToProps = dispatch => ({
  listStudents: () => dispatch({ type: LIST_TEACHERS.REQUEST }),
});

/* <Row>
  <div className="col-md-12 col-sm-12 col-xs-12 text-center">
    <img src="/assets/images/NewUi/dashed.png" className="dashed" />
    <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.testimonialsHeading')}</h2>
    <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.testimonialsSubheading')}</h4>
  </div>

  <div className="col-md-5 col-sm-4 col-xs-4">
    <div className="right-side-testimonials">
      <img src="/assets/images/NewUi/image-560.png" className="Image-teacher" />
    </div>
  </div>
  <div className="col-md-7 col-sm-8 col-xs-8">
    <div className="left-side-testimonials">
      <h4 className="subheading-teacher">{translationText(hbwText, 'saudiLanding.storySubheading')}</h4>
      <h2 className="heading-teacher">{translationText(hbwText, 'saudiLanding.storyHeading')}</h2>
      <p>{translationText(hbwText, 'saudiLanding.storyContent1')}</p>
      <span>{translationText(hbwText, 'saudiLanding.storyContent2')}</span>
    </div>
  </div>
</Row> */
