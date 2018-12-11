import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { addToast, TOAST_TYPE } from '../../components/Toast';
import { translationText } from '../../helpers';
import { RESET_PASSWORD } from '../../redux/constants';
import { EMAIL_PATTERN } from '../../constants';
import { Row, Button, Input } from '../../components/Layout';
import { translationType, errorType } from '../../types';

export class PasswordResetForm extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    resetPasswordResponse: PropTypes.shape().isRequired,
    userError: errorType.isRequired,
    resetPassword: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
  };

  static defaultProps = {
    onSuccess: null,
  };

  state = {
    email: '',
    formErrors: {
      email: '',
    },
    formValid: false,
  };

  componentWillReceiveProps({ resetPasswordResponse }) {
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;
    translationText(hbwText, 'success.emailSuccessfullySent');
    if (!isEmpty(resetPasswordResponse) && resetPasswordResponse !== this.props.resetPasswordResponse) {
      addToast(hbwText.success.emailSuccessfullySent, TOAST_TYPE.SUCCESS, 3);
      if (this.props.onSuccess) this.props.onSuccess();
    }
  }

  handleUserInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => this.validateField(name, value));
  };

  validateField(name, value) {
    const fieldValidationErrors = this.state.formErrors;
    let emailValid;

    if (name === 'email') {
      emailValid = EMAIL_PATTERN.test(value);
      fieldValidationErrors.email = emailValid ? '' : value.length ? 'error.invalidEmail' : 'validation.emailRequired';
      this.setState({ formErrors: fieldValidationErrors }, this.validateForm);
    }
  }

  validateForm() {
    const { formErrors } = this.state;
    this.setState({ formValid: formErrors.email === '' });
  }

  render() {
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;
    const { resetPassword } = this.props;
    const { email, formValid, formErrors } = this.state;

    return (
      <div className="login-form">
        <h3>{translationText(hbwText, 'passwordReset.heading')}</h3>
        <p className="subtitle">{translationText(hbwText, 'passwordReset.para')}</p>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            resetPassword(email);
          }}
        >
          {this.props.userError &&
            this.props.userError.resetPassword && (
              <p className="text-color-red">{this.props.userError.resetPassword}</p>
            )}
          <Input
            type="email"
            name="email"
            value={email}
            label={translationText(hbwText, 'form.email')}
            icon="user"
            onChange={this.handleUserInput}
          />
          {!!formErrors.email && <p className="form-error">{translationText(hbwText, formErrors.email)}</p>}
          <Row align="center" className="mt-4">
            <Button
              htmlType="submit"
              type="primary"
              size="lg"
              disabled={!formValid}
              value={translationText(hbwText, 'form.send')}
            />
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  resetPasswordResponse: state.toJS().user.resetPasswordResponse,
  userError: state.toJS().user.error,
});

const mapDispatchToProps = dispatch => ({
  resetPassword: email => dispatch({ type: RESET_PASSWORD.REQUEST, payload: email }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordResetForm);
