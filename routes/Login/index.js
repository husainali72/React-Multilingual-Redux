import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import { Row, Vr, Flex } from '../../components/Layout';
import { LoginForm, OnboardingMessages } from '../../components/LoginSignup';

export default class Login extends Component {
  /* eslint-disable react/prop-types */
  render() {
    return (
      <Row nowrap className="guest-route-wrapper">
        {!isMobile && (
          <React.Fragment>
            <Flex value="1">
              <OnboardingMessages />
            </Flex>
            <Vr />
          </React.Fragment>
        )}
        <Flex value="1">
          <LoginForm match={this.props.match} />
        </Flex>
      </Row>
    );
  }
}
