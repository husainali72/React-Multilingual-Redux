import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import { VERIFY_EMAIL } from '../../redux/constants';
import { translationText } from '../../helpers';
import { translationType, errorType, userType } from '../../types';
import { ProgressSpinner, RippleSpinner } from '../../components/Layout';

class VerifyEmail extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    user: userType.isRequired,
    verifyEmailResponse: PropTypes.shape(),
    userError: errorType.isRequired,
    verifyEmail: PropTypes.func.isRequired,
  };

  static defaultProps = {
    verifyEmailResponse: {},
  };

  state = {
    verifying: true,
  };

  componentDidMount() {
    /* eslint-disable */
    let query = this.props.history.location.search;
    if (query) query = query.replace('?', '').split('=');
    const index = query.indexOf('token');
    const token = index !== -1 ? query[index + 1] : null;
    if (token) this.props.verifyEmail(token);
  }

  componentWillReceiveProps({ userError, verifyEmailResponse }) {
    if (!isEmpty(userError) && userError.verifyEmail !== this.props.verifyEmail) {
      this.setState({ verifying: false, verified: false });
    }
    if (!isEmpty(verifyEmailResponse) && userError.verifyEmailResponse !== this.props.verifyEmailResponse) {
      this.setState({ verifying: false, verified: true });
    }
  }

  render() {
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;
    const { verifying, verified } = this.state;
    const { user } = this.props;
    return (
      <div className="email-verify-container">
        <div className="loading-container">
          {verifying && <RippleSpinner />}
          {!verifying && (
            <div className="verified">
              {verified ? <i className="fa fa-check-circle" /> : <i className="fa fa-times-circle-o" />}
              {isEmpty(user) ? (
                <Link to="/login" className="hbw-button hbw-button-primary">
                  {translationText(hbwText, 'tab.login')}
                </Link>
              ) : (
                <Link to="/home" className="hbw-button hbw-button-primary">
                  {translationText(hbwText, 'tab.dashboard')}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  user: state.toJS().user.loggedUser,
  verifyEmailResponse: state.toJS().user.verifyEmailResponse,
  userError: state.toJS().user.error,
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: token => dispatch({ type: VERIFY_EMAIL.REQUEST, payload: token }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyEmail);
