import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { SUBSCRIBE_GROUP_TUTORING, UNSUBSCRIBE_GROUP_TUTORING } from '../../redux/constants';
import { errorType } from '../../types';

class SessionCardContainer extends Component {
  static propTypes = {
    subscribeGroupTutoring: PropTypes.shape().isRequired,
    unsubscribeGroupTutoring: PropTypes.shape().isRequired,
    children: PropTypes.func.isRequired,
    subscribeSession: PropTypes.func.isRequired,
    unSubscribeSession: PropTypes.func.isRequired,
    error: errorType.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: 0,
    };
  }

  componentWillReceiveProps({ subscribeGroupTutoring, unsubscribeGroupTutoring, error }) {
    if (!isEmpty(subscribeGroupTutoring) && subscribeGroupTutoring !== this.props.subscribeGroupTutoring) {
      this.setState({ isLoading: 0 });
    }
    if (!isEmpty(unsubscribeGroupTutoring) && unsubscribeGroupTutoring !== this.props.unsubscribeGroupTutoring) {
      this.setState({ isLoading: 0 });
    }
    if (!isEmpty(error) && (error.unsubscribeGroupTutoring || error.subscribeGroupTutoring)) {
      this.setState({ isLoading: 0 });
    }
  }

  sessionEvent = (eventName, session) => {
    const { subscribeSession, unSubscribeSession } = this.props;
    if (this.state.isLoading === (session.id || session.tutoring_logger_id)) {
      return;
    }
    this.setState({ isLoading: session.id || session.tutoring_logger_id });
    if (eventName === 'subscribe') {
      subscribeSession({ id: session.id || session.tutoring_logger_id });
    } else if (eventName === 'unsubscribe') {
      unSubscribeSession(session.id || session.tutoring_logger_id);
    } else if (eventName === 'goToClass') {
      /* eslint-disable react/prop-types */
      this.props.history.push(`/class/${session.id || session.tutoring_logger_id}`);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children({
          isLoading: this.state.isLoading,
          sessionEvent: this.sessionEvent,
        })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  subscribeGroupTutoring: state.toJS().tutoring.subscribeGroupTutoring,
  unsubscribeGroupTutoring: state.toJS().tutoring.unsubscribeGroupTutoring,
  error: state.toJS().tutoring.error,
});

const mapDispatchToProps = dispatch => ({
  subscribeSession: data => dispatch({ type: SUBSCRIBE_GROUP_TUTORING.REQUEST, payload: data }),
  unSubscribeSession: id => dispatch({ type: UNSUBSCRIBE_GROUP_TUTORING.REQUEST, payload: id }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SessionCardContainer),
);
