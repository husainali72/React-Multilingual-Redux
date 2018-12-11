import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, groupBy } from 'lodash';
import PropTypes from 'prop-types';
import {
  UNSUBSCRIBE_COURSES,
  SUBSCRIBE_COURSES,
  FOLLOW,
  UNFOLLOW,
  UPCOMING_TEACHER_SESSION,
} from '../../redux/constants';
import { classType } from '../../types';
import { Column, Hr, Flex, AvatarGroup, Avatar, Button } from '../Layout';
import Sidebar from '../Sidebar';
import Rating from '../rating';
import Icon from '../Icon';
import { translationText } from '../../helpers';
import { SessionCardContainer } from '.';
import SessionCard from './sessionCard';
import { SessionCardPlaceholder } from '../Placeholder';

class TeacherProfileSidebar extends Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    teacher: PropTypes.shape({}),
    upcomingTeacherSession: PropTypes.arrayOf(classType).isRequired,
    getTeacherUpcomingSession: PropTypes.func.isRequired,
    handleCloseTeacherProfileSidebar: PropTypes.func.isRequired,
    isLoadingupcomingTeacherSession: PropTypes.bool,
    hbwText: PropTypes.shape({}).isRequired,
    followTeacher: PropTypes.func.isRequired,
    follow: PropTypes.shape().isRequired,
    unfollowTeacher: PropTypes.func.isRequired,
    unfollow: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    teacher: {},
    isLoadingupcomingTeacherSession: false,
  };

  state = {
    scheduledGroupTutoring: {},
    isRequested: false,
  };

  componentDidMount() {
    const { user, getTeacherUpcomingSession, teacher } = this.props;
    getTeacherUpcomingSession({ teacher_id: teacher.id, grade: user.grade });
  }

  componentWillReceiveProps({ upcomingTeacherSession, follow, unfollow }) {
    if (!isEmpty(upcomingTeacherSession) && upcomingTeacherSession !== this.props.upcomingTeacherSession) {
      const groupByDateScheduledTutoring = groupBy(upcomingTeacherSession, session =>
        session.start_time
          .split('T')[0]
          .split('-')
          .reverse()
          .join(''),
      );
      this.setState({
        scheduledGroupTutoring: groupByDateScheduledTutoring,
      });
    }
    if (!isEmpty(follow) && follow !== this.props.follow) {
      this.setState({ isRequested: false });
    }
    if (!isEmpty(unfollow) && unfollow !== this.props.unfollow) {
      this.setState({ isRequested: false });
    }
  }

  followTeacher = (id) => {
    this.setState({ isRequested: true });
    this.props.followTeacher(id);
  };

  unfollowTeacher = (id) => {
    this.setState({ isRequested: true });
    this.props.unfollowTeacher(id);
  };

  render() {
    const { isRequested, scheduledGroupTutoring } = this.state;
    const { teacher, isLoadingupcomingTeacherSession, handleCloseTeacherProfileSidebar, hbwText } = this.props;
    const isRtl = document.body.dir === 'rtl';

    return (
      <React.Fragment>
        <Sidebar onClose={handleCloseTeacherProfileSidebar}>
          <Column
            align="center"
            justify="space"
            className="teacher-profile-sidebar flex-nowrap"
            style={{ backgroundImage: 'url(/assets/images/teacher-profile-background.png)' }}
          >
            <Icon
              className="close-sidebar-btn"
              onClick={handleCloseTeacherProfileSidebar}
              name="plus"
              fill="#fff"
              rotate="45"
            />
            {!teacher.is_following ? (
              <Button
                className="teacher-follow-btn default-btn"
                outlined
                icon="user"
                onClick={() => this.followTeacher(teacher.user_id)}
                loading={isRequested}
              >
                {translationText(hbwText, 'button.follow')}
              </Button>
            ) : (
              <Button
                className="teacher-follow-btn"
                type="green"
                size="md"
                onClick={() => this.unfollowTeacher(teacher.user_id)}
                loading={isRequested}
              >
                <Icon name="correct" stroke="#fff" fill="transparent" />
                {translationText(hbwText, 'button.following')}
              </Button>
            )}
            <Rating
              rating={Number((teacher.rating_total / teacher.rating_count).toFixed(1))}
              height="15px"
              width="15px"
            />
            <Avatar url={teacher.profilePic || teacher.profile_pic} gender={teacher.gender} size="96px" teacher />
            <p className="teacher-name">
              {isRtl ? 'أ/ ' : ''}
              {teacher.name}
            </p>
            <span className="teacher-city">{teacher.city}</span>
            <div className="teacher-followers">
              <AvatarGroup size="26px" list={teacher.followers} />
              <span>{`${teacher.follower_count} ${translationText(hbwText, 'label.follower')}`}</span>
            </div>
          </Column>
          <h4 className="teacher-profile-heading">{translationText(hbwText, 'heading.upcomingTutoring')}</h4>
          <Flex value="1" style={{ overflowY: 'auto', padding: '0 20px' }}>
            {!isEmpty(scheduledGroupTutoring) && (
              <SessionCardContainer>
                {({ sessionEvent, isLoading }) =>
                  Object.keys(scheduledGroupTutoring)
                    .sort()
                    .map(date => (
                      <React.Fragment key={date}>
                        <p className="subtitle">
                          {new Date(scheduledGroupTutoring[date][0].start_time).toDateString()}
                        </p>
                        <Hr />
                        {scheduledGroupTutoring[date].map((session, index) => (
                          <Column align="end" key={session.id}>
                            <SessionCard
                              showType
                              session={session}
                              hbwText={hbwText}
                              isLoading={isLoading}
                              sessionEvent={sessionEvent}
                              teacher
                            />
                            {index + 1 !== scheduledGroupTutoring[date].length && <Hr width="90%" />}
                          </Column>
                        ))}
                      </React.Fragment>
                    ))
                }
              </SessionCardContainer>
            )}
            {!isLoadingupcomingTeacherSession && isEmpty(scheduledGroupTutoring) && (
              <div className="empty-slate flex-column flex-nowrap align-center">
                <Icon name="no-sessions" color="#919a9e" width="50px" height="50px" />
                <p className="subtitle">{translationText(hbwText, 'tutoring.noUpcomingSessionOfTeacher')}</p>
              </div>
            )}
            {isLoadingupcomingTeacherSession && isEmpty(scheduledGroupTutoring) && <SessionCardPlaceholder />}
          </Flex>
        </Sidebar>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.toJS().user.loggedUser,
  isLoadingupcomingTeacherSession: state.toJS().tutoring.isLoadingupcomingTeacherSession,
  hbwText: state.toJS().translation.hbwText,
  upcomingTeacherSession: state.toJS().tutoring.upcomingTeacherSession,
  unsubscribeGroupTutoring: state.toJS().tutoring.unsubscribeGroupTutoring,
  subscribeGroupTutoring: state.toJS().tutoring.subscribeGroupTutoring,
  follow: state.toJS().user.follow,
  unfollow: state.toJS().user.unfollow,
});

const mapStateToDispatch = dispatch => ({
  getTeacherUpcomingSession: data => dispatch({ type: UPCOMING_TEACHER_SESSION.REQUEST, payload: data }),
  unsubscribeCourses: id => dispatch({ type: UNSUBSCRIBE_COURSES.REQUEST, payload: id }),
  subscribeCourses: id => dispatch({ type: SUBSCRIBE_COURSES.REQUEST, payload: id }),
  followTeacher: id => dispatch({ type: FOLLOW.REQUEST, payload: id }),
  unfollowTeacher: id => dispatch({ type: UNFOLLOW.REQUEST, payload: id }),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(TeacherProfileSidebar);
