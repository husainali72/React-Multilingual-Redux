import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Serializer } from 'helpers';
import { SIGNUP_USER } from '../../redux/constants';
import { getSelectedCountry, EMAIL_PATTERN, PHONE_PATTERN } from '../../constants';
import { translationText, clearError } from '../../helpers';
import { translationType, errorType } from '../../types';
import { Hr, Row, Button, HBWLink, Input, Center } from '../../components/Layout';

export class SignupForm extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    userError: errorType.isRequired,
    createUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    /* eslint-disable react/prop-types */
    const selectedCountry = getSelectedCountry();
    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        phone: '',
        country_code: `+${selectedCountry.calling_code}`,
        country_id: selectedCountry.id,
      },
      formErrors: {
        name: '',
        email: '',
        password: '',
        phone: '',
      },
      userRole: 'teacher',
      showPassword: false,
    };
  }

  componentWillUnmount() {
    clearError('user');
  }

  handleUserInput = (e) => {
    const { name, value } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user }, () => {
      this.validateField(name, value);
    });
  };

  validateField(name, value) {
    const fieldValidationErrors = this.state.formErrors;
    let emailValid;

    switch (name) {
      case 'name':
        fieldValidationErrors.name = value.length ? '' : 'validation.nameRequired';
        break;
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
    const { formErrors, user } = this.state;
    if (user.name === '') {
      this.setState({ formErrors: { ...formErrors, name: 'validation.nameRequired' } });
      return false;
    }
    if (user.email === '') {
      this.setState({ formErrors: { ...formErrors, email: 'validation.emailRequired' } });
      return false;
    }
    if (user.password === '') {
      this.setState({ formErrors: { ...formErrors, password: 'validation.passwordRequired' } });
      return false;
    }
    if (user.phone === '') {
      this.setState({ formErrors: { ...formErrors, phone: 'validation.passwordRequired' } });
      return false;
    }
    if (
      formErrors.name === '' &&
      formErrors.email === '' &&
      formErrors.password === '' &&
      formErrors.phone === '' &&
      user.phone.length
    ) {
      return true;
    }
    return false;
  }

  submitForm = (ev) => {
    ev.preventDefault();
    const { createUser, user } = this.props;
    if (!this.validateForm()) return;
    const newUser = Object.assign(Serializer.serialize(ev.target, { hash: true }), user);
    if (newUser.phone) {
      newUser.phone = `+966${newUser.phone}`;
    }
    console.log(newUser);
    createUser(newUser);
  };

  render() {
    const { hbwText } = this.props;
    const { formErrors, user, userRole, showPassword } = this.state;

    return (
      <div className="login-form">
        <h3 className="text-center">{translationText(hbwText, 'singup.heading')}</h3>
        <p className="subtitle text-center">{translationText(hbwText, 'signup.para')}</p>
        <form noValidate onSubmit={this.submitForm}>
          {this.props.userError &&
            this.props.userError.signup && <p className="text-color-red">{this.props.userError.signup}</p>}
          <Input
            type="text"
            name="name"
            label={translationText(hbwText, 'form.name')}
            icon="user"
            onChange={this.handleUserInput}
            error={formErrors.name}
          />
          {!!formErrors.name && <p className="form-error">{translationText(hbwText, formErrors.name)}</p>}
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
          <div className="animated fadeIn">
            <Input
              type="tel"
              name="phone"
              label={translationText(hbwText, 'form.phone')}
              placeholder={user.country_id === 1 ? '5xxxxxxxx' : 'xxxxxxxxxx'}
              maxLength={user.country_id === 1 ? 9 : 10}
              onChange={this.handleUserInput}
              error={formErrors.phone}
            >
              <span dir="ltr" className="country-code">
                {user.country_code}
              </span>
            </Input>
            {!!formErrors.phone && (
              <p className="form-error">{translationText(hbwText, 'validation.phoneRequired')}</p>
            )}
          </div>
          <Row align="center" justify="center" className="submit-button-block mt-4">
            <Button htmlType="submit" type="primary" size="xl" value={translationText(hbwText, 'button.continue')} />
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
  createUser: user => dispatch({ type: SIGNUP_USER.REQUEST, payload: user }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm);
