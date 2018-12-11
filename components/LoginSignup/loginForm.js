import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LOGIN_USER } from '../../redux/constants';
import { getSelectedCountry, EMAIL_PATTERN, PHONE_PATTERN } from '../../constants';
import { Serializer, translationText, clearError } from '../../helpers';
import { translationType, errorType } from '../../types';
import { Hr, Row, Button, HBWLink, Input, Center } from '../../components/Layout';

export class LoginForm extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    userError: errorType.isRequired,
    loginUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    /* eslint-disable react/prop-types */
    const selectedCountry = getSelectedCountry();
    this.state = {
      user: {
        email: '',
        password: '',
        phone: '',
        country_code: `+${selectedCountry.calling_code}`,
        country_id: selectedCountry.id,
      },
      formErrors: {
        email: '',
        password: '',
        phone: '',
      },
      userRole: 'teacher',
      showPassword: false,
    };
  }

  componentWillUnmount() {
    if (this.inputTimer) clearTimeout(this.inputTimer);
    clearError('user');
  }

  handleUserInput = (e) => {
    const { name, value } = e.target;
    if (this.inputTimer) clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(() => {
      const { user } = this.state;
      this.setState({ user: { ...user, [name]: value } }, () => {
        this.validateField(name, value);
      });
    }, 300);
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
      case 'phone':
        fieldValidationErrors.phone = PHONE_PATTERN[1].test(value) ? '' : 'validation.phoneNumberSize';
        break;
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors });
  }

  validateForm() {
    const { formErrors } = this.state;
    if (formErrors.email === '' && formErrors.password === '') {
      return true;
    }
    return false;
  }

  submitForm = (ev) => {
    ev.preventDefault();
    const { user, loginUser } = this.props;
    if (this.validateForm()) {
      loginUser(Object.assign(Serializer.serialize(ev.target, { hash: true }), user));
    }
  };

  render() {
    const { formErrors, user, userRole, showPassword } = this.state;
    const { hbwText } = this.props;

    return (
      <div className="login-form">
        <h3 className="text-center">{translationText(hbwText, 'login.heading')}</h3>
        <p className="subtitle text-center">{translationText(hbwText, 'login.para')}</p>
        <form noValidate onSubmit={this.submitForm}>
          {this.props.userError &&
            this.props.userError.login && <p className="text-color-red">{this.props.userError.login}</p>}
          <Input
            type="email"
            name="email"
            label={translationText(hbwText, 'form.email')}
            icon="email"
            onChange={this.handleUserInput}
            error={formErrors.email}
          />
          {!!formErrors.email && <p className="form-error">{translationText(hbwText, formErrors.email)}</p>}
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            label={translationText(hbwText, 'form.password')}
            icon="lock"
            onChange={this.handleUserInput}
            error={formErrors.password}
          >
            <Button
              htmlType="button"
              type="link"
              size="sm"
              onClick={() => this.setState(prevState => ({ showPassword: !prevState.showPassword }))}
            >
              {translationText(hbwText, showPassword ? 'button.hidePassword' : 'button.showPassword')}
            </Button>
          </Input>
          {!!formErrors.password && <p className="form-error">{translationText(hbwText, formErrors.password)}</p>}
          <Row align="center" justify="center" className="submit-button-block mt-4">
            <Button htmlType="submit" type="primary" size="xl" value={translationText(hbwText, 'button.login')} />
          </Row>
        </form>
        <Hr text={translationText(hbwText, 'mesaages.or')} />
        <Row justify="center" className="mt-5 justify-space-sm">
          <HBWLink
            href={`${process.env.API_USER_URL}social/facebook?country_id=${user.country_id}&user_role=${userRole}`}
            rounded
            faIcon="facebook"
            type="facebook"
            size="lg"
          >
            {translationText(hbwText, 'home.fb')}
          </HBWLink>
          <HBWLink
            href={`${process.env.API_USER_URL}twitterAuthWeb?app_name=hbw_academy&user_role=${userRole}&callback_url=${
              process.env.TEACHER_URL
            }&country_id=${user.country_id}`}
            rounded
            faIcon="twitter"
            type="twitter"
            size="lg"
          >
            {translationText(hbwText, 'home.twitter')}
          </HBWLink>
        </Row>
        <Center className="mt-3">
          <HBWLink type="link" to="/password-reset" value={translationText(hbwText, 'tab.forgotPassword')} />
        </Center>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  userError: state.toJS().user.error,
});

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch({ type: LOGIN_USER.REQUEST, payload: user }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
