import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { addToast, TOAST_TYPE } from '../../components/Toast';
import { CHANGE_PASSWORD } from '../../redux/constants';
import { EMAIL_PATTERN } from '../../constants';
import { translationText } from '../../helpers';
import { translationType, errorType } from '../../types';
import { Row, Button, Input } from '../../components/Layout';

class PasswordReset extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    changePasswordResponse: PropTypes.shape().isRequired,
    changePassword: PropTypes.func.isRequired,
    userError: errorType.isRequired,
    token: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
  };

  static defaultProps = {
    onSuccess: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      formErrors: {
        email: '',
      },
      formValid: false,
    };
  }

  componentWillReceiveProps({ changePasswordResponse }) {
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;
    translationText(hbwText, 'success.emailSuccessfullySent');

    if (!isEmpty(changePasswordResponse) && changePasswordResponse !== this.props.changePasswordResponse) {
      addToast('Password Updated', TOAST_TYPE.SUCCESS, 3);
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

    switch (name) {
      case 'email':
        emailValid = EMAIL_PATTERN.test(value);
        fieldValidationErrors.email = emailValid
          ? ''
          : value.length
            ? 'error.invalidEmail'
            : 'validation.emailRequired';
        break;
      case 'password':
        fieldValidationErrors.password =
          value.length >= 4 ? '' : value.length ? 'error.shortPassword' : 'validation.passwordRequired';
        break;
      case 'confirmPassword':
        fieldValidationErrors.confirmPassword = this.state.password !== value ? 'error.confirmPassword' : '';
        break;
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors }, this.validateForm);
  }

  validateForm() {
    const { formErrors, password, confirmPassword, email } = this.state;
    this.setState({
      formValid:
        !!email &&
        formErrors.email === '' &&
        formErrors.password === '' &&
        formErrors.confirmPassword === '' &&
        !!password &&
        !!confirmPassword,
    });
  }

  render() {
    const { changePassword, token } = this.props;
    const { email, formValid, formErrors, password, confirmPassword } = this.state;
    const hbwText = JSON.parse(localStorage.getItem('globalText')) || this.props.hbwText;

    return (
      <div className="login-form">
        <h3>{translationText(hbwText, 'passwordReset.changeHeading')}</h3>
        <p className="subtitle">{translationText(hbwText, 'passwordReset.changePara')}</p>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            changePassword({ email, password, token });
          }}
        >
          {this.props.userError &&
            this.props.userError.changePassword && (
              <p className="text-color-red">{this.props.userError.changePassword}</p>
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
          <Input
            type="password"
            name="password"
            value={password}
            label={translationText(hbwText, 'form.password')}
            icon="lock"
            onChange={this.handleUserInput}
          />
          {!!formErrors.password && <p className="form-error">{translationText(hbwText, formErrors.password)}</p>}
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            label={translationText(hbwText, 'form.confirmPassword')}
            icon="lock"
            onChange={this.handleUserInput}
          />
          {!!formErrors.confirmPassword && (
            <p className="form-error">{translationText(hbwText, formErrors.confirmPassword)}</p>
          )}
          <Row align="center" className="mt-4">
            <Button
              htmlType="submit"
              type="primary"
              size="lg"
              disabled={!formValid}
              value={translationText(hbwText, 'form.submit')}
            />
          </Row>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  changePasswordResponse: state.toJS().user.changePasswordResponse,
  userError: state.toJS().user.error,
});

const mapDispatchToProps = dispatch => ({
  changePassword: data => dispatch({ type: CHANGE_PASSWORD.REQUEST, payload: data }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PasswordReset);
