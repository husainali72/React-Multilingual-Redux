import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Icon from '../Icon';
import { Row, Flex, Button } from '../Layout';
import { translationType } from '../../types';
import NavigationMenu from '../NavigationMenu';
import { translationText } from '../../helpers';

class SpecialNavBar extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
  };

  constructor(props) {
    super(props);
    /* eslint-disable react/prop-types */
    const organisationName = props.match.params.id;
    this.items = [
      {
        label: 'tab.login',
        url: organisationName ? `/login/${organisationName}` : '/login',
      },
      {
        label: 'tab.signup',
        url: organisationName ? `/signup/${organisationName}` : '/signup',
      },
    ];
    this.state = {
      organisationName,
    };
  }

  setLocale(locale) {
    localStorage.setItem('language', locale);
    window.location.reload();
  }

  render() {
    const { hbwText } = this.props;
    const isRtl = document.body.dir === 'rtl';
    const { organisationName } = this.state;
    return (
      <React.Fragment>
        {!isMobile ? (
          <Row nowrap className="hbw-navigation-bar hbw-navigation-bar-special">
            <Flex vlaue="1">
              <Link to="/" className="hbw-brand">
                {isRtl ? <Icon name="hbw-ar" /> : <Icon name="hbw-en" />}
              </Link>
              {organisationName && (
                <img src={`/assets/images/${organisationName}-logo.png`} alt="" style={{ height: '30px' }} />
              )}
              <Button to="/" type="link">
                {translationText(hbwText, 'home.dashboardTitle')}
              </Button>
            </Flex>
            <Row justify="center" flex="auto">
              <NavigationMenu noUnderline items={this.items} hbwText={hbwText} />
            </Row>
          </Row>
        ) : (
          <Row nowrap className="hbw-navigation-bar hbw-navigation-bar-special depth-2">
            <Link to="/" className="hbw-brand">
              <Icon name="logo" />
            </Link>
            <NavigationMenu noUnderline items={this.items} hbwText={hbwText} />
          </Row>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
});

export default withRouter(connect(mapStateToProps)(SpecialNavBar));
