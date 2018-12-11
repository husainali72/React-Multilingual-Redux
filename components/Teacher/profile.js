import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PublicNavBar, StudentNavBar, SpecialNavBar } from '../NavigationBar';
import { translationType, userType } from '../../types';
import { connect } from 'react-redux';

class TeacherProfile extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;

    return <div className="home-container" />;
  }
}
const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
});

export default connect(mapStateToProps)(TeacherProfile);
