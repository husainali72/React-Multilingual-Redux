import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import MainSidebar from '../../components/MainSidebar';
import { Card, Row, Column, Flex, Hr, HBWDate } from '../../components/Layout';
import { CardHeader, SessionCard, SessionCardContainer } from '../../components/Dashboard';
import { getObjectByProperty, translationText } from '../../helpers';
import {
  UPCOMING_GROUP_TUTORING,
} from '../../redux/constants';
import { classType, translationType } from '../../types';
import { SessionCardPlaceholder } from '../../components/Placeholder';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/Icon';

class Home extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    upcomingGroupTutoring: PropTypes.arrayOf(classType).isRequired,
    getUpcomingSession: PropTypes.func.isRequired,
    isLoadingUpcomingGroupTutoring: PropTypes.bool.isRequired,
  };

  state = {
    showScheduledTutoringSidebar: false,
    scheduledTutoring: {},
  };

  componentDidMount() {
    const { getUpcomingSession } = this.props;
    getUpcomingSession({ user_state: 'reserved', state: 'scheduled' });
  }

  /* eslint-disable react/prop-types */
  componentWillReceiveProps({ upcomingGroupTutoring }) {
    if (upcomingGroupTutoring !== this.props.upcomingGroupTutoring) {
      const groupByDateScheduledTutoring = groupBy(
        upcomingGroupTutoring.filter(o => o.state === 'scheduled' && o.myState !== ''),
        session =>
          session.start_time
            .split('T')[0]
            .split('-')
            .reverse()
            .join(''),
      );
      this.setState({
        scheduledTutoring: groupByDateScheduledTutoring,
      });
    }
  }

  render() {
    const { showScheduledTutoringSidebar, scheduledTutoring } = this.state;
    const { products, isLoadingUpcomingGroupTutoring, hbwText } = this.props;
    return (
      <Row nowrap className="container page-content">
        {showScheduledTutoringSidebar && (
          // <!-- session sidebar -->
          <Sidebar onClose={() => this.setState({ showScheduledTutoringSidebar: false })}>
            <CardHeader
              className="sidebar-session__card-header"
              text={translationText(hbwText, 'heading.myScheduledSession')}
              lessBtn
              onClick={() => this.setState({ showScheduledTutoringSidebar: false })}
            />
            <Flex value="1" className="sidebar-session__card-body">
              {!isEmpty(scheduledTutoring) && (
                <SessionCardContainer>
                  {({ sessionEvent, isLoading }) =>
                    Object.keys(scheduledTutoring)
                      .sort()
                      .map(date => (
                        <React.Fragment key={date}>
                          <p className="mt-1">
                            <HBWDate className="subtitle" humanize value={scheduledTutoring[date][0].start_time} />
                          </p>
                          <Hr />
                          {scheduledTutoring[date].map((session, index) => (
                            <Column align="end" key={session.id}>
                              <SessionCard
                                showType
                                session={session}
                                hbwText={hbwText}
                                isLoading={isLoading}
                                sessionEvent={sessionEvent}
                                productImage={
                                  getObjectByProperty(products, 'id', session.product_id).image_thumbnail_uri
                                }
                              />
                              {index + 1 !== scheduledTutoring[date].length && <Hr width="90%" />}
                            </Column>
                          ))}
                        </React.Fragment>
                      ))
                  }
                </SessionCardContainer>
              )}
            </Flex>
          </Sidebar>
        )}

        {/* <!-- sidebar widget --> */}
        <MainSidebar profileWidget />

        <Flex className="home-content">

          {/* <!-- live session card --> */}
          {/* {!!myLiveSessions.length && (
            <Card className="session-table">
              <CardHeader
                text={translationText(hbwText, 'heading.myLiveSession')}
                icon="live-class"
                color={COLORS.red.base}
                iconColor={COLORS.red.base}
              />
              <SessionCardContainer>
                {({ sessionEvent }) =>
                  myLiveSessions.map((session, index) => (
                    <Column align="end" key={session.id}>
                      <SessionCard
                        showType
                        session={session}
                        hbwText={hbwText}
                        sessionEvent={sessionEvent}
                        productImage={getObjectByProperty(products, 'id', session.product_id).image_thumbnail_uri}
                      />
                      {index + 1 !== myLiveSessions.length && <Hr width="90%" />}
                    </Column>
                  ))
                }
              </SessionCardContainer>
            </Card>
          )} */}

          {/* <!-- all upcoming tutoring card --> */}
          <Card className="session-table">
            <CardHeader
              text={translationText(hbwText, 'heading.myScheduledSession')}
              moreBtn={
                scheduledTutoring && Object.keys(scheduledTutoring).length > 2
                  ? translationText(hbwText, 'label.more')
                  : null
              }
              onClick={() => this.setState({ showScheduledTutoringSidebar: true })}
            />
            {!isEmpty(scheduledTutoring) && (
              <SessionCardContainer>
                {({ sessionEvent, isLoading }) =>
                  Object.keys(scheduledTutoring)
                    .sort()
                    .slice(0, 5)
                    .map(date => (
                      <React.Fragment key={date}>
                        <p className="mt-1">
                          <HBWDate className="subtitle" humanize value={scheduledTutoring[date][0].start_time} />
                        </p>
                        <Hr />
                        {scheduledTutoring[date].map((session, index) => (
                          <Column align="end" key={session.id}>
                            <SessionCard
                              showType
                              session={session}
                              hbwText={hbwText}
                              isLoading={isLoading}
                              sessionEvent={sessionEvent}
                              productImage={getObjectByProperty(products, 'id', session.product_id).image_thumbnail_uri}
                            />
                            {index + 1 !== scheduledTutoring[date].length && <Hr width="90%" />}
                          </Column>
                        ))}
                      </React.Fragment>
                    ))
                }
              </SessionCardContainer>
            )}
            {!isLoadingUpcomingGroupTutoring && isEmpty(scheduledTutoring) && (
              <div className="empty-slate flex-column flex-nowrap align-center">
                <Icon name="no-sessions" color="#919a9e" width="50px" height="50px" />
                <p className="subtitle">{translationText(hbwText, 'tutoring.noBookedSessions')}</p>
              </div>
            )}
            {isLoadingUpcomingGroupTutoring && isEmpty(scheduledTutoring) && <SessionCardPlaceholder />}
          </Card>

        </Flex>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  upcomingGroupTutoring: state.toJS().tutoring.upcomingGroupTutoring,
  isLoadingUpcomingGroupTutoring: state.toJS().tutoring.isLoadingUpcomingGroupTutoring,
});

const mapDispatchToProps = dispatch => ({
  getUpcomingSession: data => dispatch({ type: UPCOMING_GROUP_TUTORING.REQUEST, payload: data }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
