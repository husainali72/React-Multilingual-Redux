import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import { Row, Vr, Flex } from '../../components/Layout';
import { SignupForm, OnboardingMessages } from '../../components/LoginSignup';

export default class Signup extends Component {
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
          <SignupForm match={this.props.match} />
        </Flex>
      </Row>
    );
  }
}
