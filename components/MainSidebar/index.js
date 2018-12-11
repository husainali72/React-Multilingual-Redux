import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Column } from '../Layout';
import {
  UpcomingSessionsWidget,
  SubscribedSessionsWidget,
  ProfileWidget,
  TeacherListWidget,
  FriendsWidget,
  CoursesWidget,
} from '../Widget';

export class MainSidebar extends Component {
  static propTypes = {
    upcomingSessionsWidget: PropTypes.bool,
    subscribedSessionsWidget: PropTypes.bool,
    profileWidget: PropTypes.bool,
    teacherListWidget: PropTypes.bool,
    friendsWidget: PropTypes.bool,
    coursesWidget: PropTypes.bool,
  };

  static defaultProps = {
    upcomingSessionsWidget: false,
    profileWidget: false,
    teacherListWidget: false,
    friendsWidget: false,
    subscribedSessionsWidget: false,
    coursesWidget: false,
  };

  render() {
    const {
      upcomingSessionsWidget,
      subscribedSessionsWidget,
      friendsWidget,
      profileWidget,
      teacherListWidget,
      coursesWidget,
    } = this.props;
    return (
      <Column className="main-sidebar-wrapper">
        {profileWidget && <ProfileWidget />}
        {friendsWidget && <FriendsWidget />}
        {upcomingSessionsWidget && <UpcomingSessionsWidget />}
        {subscribedSessionsWidget && <SubscribedSessionsWidget />}
        {teacherListWidget && <TeacherListWidget />}
        {/* {coursesWidget && <CoursesWidget maxItems={2} />} */}
      </Column>
    );
  }
}

export default MainSidebar;
