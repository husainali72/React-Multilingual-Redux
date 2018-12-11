import React, { Component } from 'react';
import { Center, Card } from '../../components/Layout';
import { PasswordResetForm, ChangePasswordForm } from '../../components/LoginSignup';

export default class PasswordReset extends Component {
  constructor(props) {
    super(props);
    /* eslint-disable react/prop-types */
    let query = props.history.location.search;
    if (query) query = query.replace('?', '').split('=');
    const index = query.indexOf('token');
    this.state = {
      token: index !== -1 ? query[index + 1] : null,
    };
    console.log(this.state.token);
  }

  resetSuccess = () => {
    /* eslint-disable react/prop-types */
    this.props.history.push('/login');
  };

  render() {
    const { token } = this.state;
    return (
      <Center>
        <Card spacing="0 20px" className="mt-3">
          {token ? (
            <ChangePasswordForm token={token} onSuccess={this.resetSuccess} />
          ) : (
            <PasswordResetForm onSuccess={this.resetSuccess} />
          )}
        </Card>
      </Center>
    );
  }
}
