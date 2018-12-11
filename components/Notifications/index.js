import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
// import Popover from 'react-popover';
// import NotificationList from './notificationList';
import Icon from '../../components/Icon';
// import {
//   REQUESTS_PENDING_ON_ME,
//   ACCEPT_FRIEND_REQUEST,
//   REJECT_FRIEND_REQUEST,
//   TIMELINE,
//   FOLLOW,
//   UNFOLLOW,
//   SEND_FRIEND_REQUEST,
//   TIMELINE_UPDATE,
// } from '../../redux/constants';
import { Badge } from '../Layout';
import { translationType } from '../../types';

export class Notifications extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    // getPendingRequest: PropTypes.func.isRequired,
    // getTimeline: PropTypes.func.isRequired,
    // pendingFriendRequest: PropTypes.arrayOf(PropTypes.object).isRequired,
    // notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    // acceptFriendRequest: PropTypes.func.isRequired,
    // rejectFriendRequest: PropTypes.func.isRequired,
    // follow: PropTypes.func.isRequired,
    // unfollow: PropTypes.func.isRequired,
    // acceptRequest: PropTypes.shape().isRequired,
    // rejectRequest: PropTypes.shape().isRequired,
    // followRequest: PropTypes.shape().isRequired,
    // unfollowRequest: PropTypes.shape().isRequired,
    // products: productListType.isRequired,
    // readNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showNotificationList: false,
      pendingRequest: [],
      notifications: [],
      notificationCount: 0,
    };
  }

  componentDidMount() {
    // this.props.getPendingRequest();
    // this.props.getTimeline();
  }

  // componentWillReceiveProps({ pendingFriendRequest, acceptRequest, rejectRequest, notifications }) {
  //   if (pendingFriendRequest !== this.props.pendingFriendRequest) {
  //     this.setState({
  //       pendingRequest: pendingFriendRequest,
  //       notificationCount:
  //         pendingFriendRequest.filter(o => !o.accepted).length +
  //         notifications.filter(o => !o.notification_feed.notification_viewed).length,
  //     });
  //   }
  //   if (notifications !== this.props.notifications) {
  //     this.setState({
  //       notifications,
  //       notificationCount:
  //         pendingFriendRequest.filter(o => !o.accepted).length +
  //         notifications.filter(o => !o.notification_feed.notification_viewed).length,
  //     });
  //   }
  //   if (!isEmpty(acceptRequest) && acceptRequest !== this.props.acceptRequest) {
  //     const { pendingRequest } = this.state;
  //     const index = pendingRequest.findIndex(o => o.id === acceptRequest.id);
  //     this.setState({
  //       pendingRequest: [
  //         ...pendingRequest.slice(0, index),
  //         { ...pendingRequest[index], accepted: true },
  //         ...pendingRequest.slice(index + 1),
  //       ],
  //     });
  //   }
  //   if (!isEmpty(rejectRequest) && rejectRequest !== this.props.rejectRequest) {
  //     this.setState({ pendingRequest: pendingFriendRequest.filter(o => o.id !== rejectRequest.id) });
  //   }
  // }

  // toggleNotificationList = (flag) => {
  //   this.setState(prevState => ({
  //     showNotificationList: flag !== undefined ? flag : !prevState.showNotificationList,
  //   }));
  //   this.props.getPendingRequest();
  //   this.props.getTimeline();
  // };

  render() {
    const { showNotificationList, pendingRequest, notifications, notificationCount } = this.state;
    // const {
    //   acceptFriendRequest,
    //   rejectFriendRequest,
    //   hbwText,
    //   follow,
    //   unfollow,
    //   sendRequest,
    //   products,
    //   readNotification,
    // } = this.props;

    // const popoverProps = {
    //   isOpen: showNotificationList,
    //   preferPlace: 'below',
    //   onOuterAction: () => this.toggleNotificationList(false),
    //   body: (
    //     <NotificationList
    //       pendingRequest={pendingRequest}
    //       acceptFriendRequest={acceptFriendRequest}
    //       rejectFriendRequest={rejectFriendRequest}
    //       sendRequest={sendRequest}
    //       follow={follow}
    //       unfollow={unfollow}
    //       hbwText={hbwText}
    //       notifications={notifications}
    //       products={products}
    //       readNotification={readNotification}
    //     />
    //   ),
    // };

    return (
      <div className="notifications-wrapper">
        {/* <LiveTime rendered onUpdate={time => time % 60 === 0 && this.props.getTimeline()} /> */}
        {/* <Popover {...popoverProps}> */}
          <div className="nav-notification-icon" onClick={() => this.toggleNotificationList()}>
            <Icon name="bell" />
            {!!notificationCount && <Badge rounded color="primary" size="sm" value={notificationCount} />}
          </div>
        {/* </Popover> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  // pendingFriendRequest: state.toJS().user.requestsPendingOnMe,
  // notifications: state.toJS().user.timeline,
  // acceptRequest: state.toJS().user.acceptFriendRequest,
  // rejectRequest: state.toJS().user.rejectFriendRequest,
  // followRequest: state.toJS().user.follow,
  // unfollowRequest: state.toJS().user.unfollow,
  // products: state.toJS().folder.products,
});

const mapDispatchToProps = dispatch => ({
  // getPendingRequest: data => dispatch({ type: REQUESTS_PENDING_ON_ME.REQUEST, payload: data }),
  // getTimeline: () => dispatch({ type: TIMELINE.REQUEST, payload: { feed_type: 'notification' } }),
  // follow: id => dispatch({ type: FOLLOW.REQUEST, payload: id }),
  // unfollow: id => dispatch({ type: UNFOLLOW.REQUEST, payload: id }),
  // sendRequest: to => dispatch({ type: SEND_FRIEND_REQUEST.REQUEST, payload: { to } }),
  // acceptFriendRequest: to => dispatch({ type: ACCEPT_FRIEND_REQUEST.REQUEST, payload: { to } }),
  // rejectFriendRequest: to => dispatch({ type: REJECT_FRIEND_REQUEST.REQUEST, payload: { to } }),
  // readNotification: payload => dispatch({ type: TIMELINE_UPDATE.REQUEST, payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
