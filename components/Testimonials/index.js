import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { LIST_STUDENTS } from '../../redux/constants';
import { translationText } from '../../helpers';
import { translationType } from '../../types';
import { Avatar, Hr } from '../Layout';

class Testimonials extends Component {
  static propTypes = {
    listStudents: PropTypes.func.isRequired,
    totalStudents: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    hbwText: translationType.isRequired,
  };

  componentDidMount() {
    const { listStudents, totalStudents } = this.props;
    if (!totalStudents) {
      listStudents();
    }
  }

  render() {
    const tweetsIndex = [7, 4, 3, 1];
    const { totalStudents, hbwText } = this.props;

    const tweets = tweetsIndex.map((tweet, index) => (
      <div className="testimonial-item" key={index}>
        <Avatar
          url={translationText(hbwText, `home.tweet${tweet}pic`)}
          size={isMobile ? '72px' : '96px'}
          className="testimonial-avatar"
        />
        <div className="testimonial-user">{translationText(hbwText, `home.tweet${tweet}name`)}</div>
        <a
          href="#"
          className="testimonial-link twitter-atreply pretty-link js-nav"
          dir="ltr"
        >
          <s>@</s>
          <b>{translationText(hbwText, `home.tweet${tweet}username`)}</b>
          <i className="fa fa-twitter" />
        </a>
        <Hr />
        <p
          className="testimonial-msg"
          dangerouslySetInnerHTML={{ __html: translationText(hbwText, `home.tweet${tweet}tweet`) }}
        />
        <Hr />
      </div>
    ));
    const pathName = window.location.pathname.replace('/', '');
    return (
      <div className="testimonial-section">
        {pathName !== 'global' && (
          <div className="section-title">
            {translationText(hbwText, 'home.moreThan')}
            <span className="no-of-students">
              &nbsp;
              {totalStudents}
              &nbsp;
            </span>
            &nbsp;
            {translationText(hbwText, 'home.studentsRegistered')}
          </div>
        )}

        <div className="section-subtitle" data-ng-bind="{translationText(hbwText, 'qudrat.testimonialSubTitle')}" />

        <div className="testimonial-wrapper">
          <div className="testimonial-row">{tweets}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  totalStudents: state.toJS().user.totalStudents,
});

const mapDispatchToProps = dispatch => ({
  listStudents: () => dispatch({ type: LIST_STUDENTS.REQUEST }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Testimonials);
