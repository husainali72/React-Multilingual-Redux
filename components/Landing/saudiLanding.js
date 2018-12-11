import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from "classnames";
import { PublicNavBar, PublicNavBarNew } from '../NavigationBar';

// import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
// import { Link } from "react-router-dom";
import isEmpty from 'lodash/isEmpty';
// import Products from "../Products";
// import Icon from "../Icon";
// import Testimonials from "../Testimonials";
// import { Row, Avatar, Column, HBWLink } from "../Layout";
/* Partials Start */
import {
  AllInOne,
  AllSubjects,
  HomePageBanner,
  Competition,
  Conclusion,
  EasyToUse,
  Footer,
  TagLine,
  Teachers,
  Testimonials,
} from './saudi-partials';

/* End */
import { SIGNUP_USER, LIST_TEACHERS, LIST_STUDENTS } from '../../redux/constants';
import { translationType, userType, teacherListType } from '../../types';

class SaudiLanding extends Component {
  static propTypes = {
    listTeachers: PropTypes.func.isRequired,
    pinnedTeachers: teacherListType.isRequired,
    hbwText: translationType.isRequired,
    user: userType.isRequired,
    totalStudents: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    listStudents: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: '',
        email: '',
        password: '',
        organisation: false,
        phone: '',
      },
      showSignup: false,
    };
  }

  componentDidMount() {
    const { listTeachers, listStudents, pinnedTeachers, totalStudents } = this.props;

    if (!pinnedTeachers.length) {
      listTeachers();
    }
    if (!totalStudents) {
      listStudents();
    }
  }

  render() {
    const { pinnedTeachers, createUser, user, totalStudents } = this.props;
    const { newUser, showSignup } = this.state;
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;

    return (
      <div className="home-container">
        <div className="home-inner-container animated fadeIn">
          <header className="hbw-header">
            <PublicNavBarNew />
          </header>

          {/* Section 1 :  "Home page banner"  */}
          <HomePageBanner hbwText={hbwText} />
          {/* Section 2 :  "Tag line"  */}
          <TagLine hbwText={hbwText} />
          {/* Section 3 :  "Competition"   */}
          <Competition hbwText={hbwText} />

          {/* Section 4 :  "easy-to-use" */}
          <EasyToUse hbwText={hbwText} />

          {/* Section 5 :  "all-in-one"  */}
          <AllInOne hbwText={hbwText} />

          {/* Section 6 :  "all-subjects: */}
          <AllSubjects hbwText={hbwText} />

          {/* Section 7 : 'testimonials' */}
          <Testimonials hbwText={hbwText} />

          {/* Section 8 : 'teachers' */}
          <Teachers list={pinnedTeachers} hbwText={hbwText} />

          {/* Section 9 : "conclusion" */}
          <Conclusion hbwText={hbwText} />

          {/* Section 10 : "footer" */}
          <Footer hbwText={hbwText} />

          {/* Section 9 : Testimonials Section */}
          {/* <Testimonials /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pinnedTeachers: state.toJS().user.pinnedTeachers,
  totalStudents: state.toJS().user.totalStudents,
  hbwText: state.toJS().translation.hbwText,
  user: state.toJS().user.loggedUser,
});

const mapDispatchToProps = dispatch => ({
  listStudents: () => dispatch({ type: LIST_STUDENTS.REQUEST }),
  listTeachers: () => dispatch({ type: LIST_TEACHERS.REQUEST }),
  createUser: data => dispatch({ type: SIGNUP_USER.REQUEST, payload: data }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SaudiLanding);
