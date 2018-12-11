import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Column } from '../../components/Layout';
import { translationText } from '../../helpers';
import { translationType } from '../../types';

class OnboardingMessages extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
  };

  constructor(props) {
    super(props);

    this.messages = [
      '/assets/images/onboarding/onboarding-message-1.jpg',
      '/assets/images/onboarding/onboarding-message-2.jpg',
      '/assets/images/onboarding/onboarding-message-3.jpg',
      '/assets/images/onboarding/onboarding-message-4.jpg',
    ];

    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    this.messageTimer = setInterval(() => {
      this.setState({ selectedIndex: (this.state.selectedIndex + 1) % this.messages.length });
    }, 4000);
  }

  componentWillUnmount() {
    if (this.messageTimer) clearInterval(this.messageTimer);
  }

  selectItem = (selectedIndex) => {
    this.setState({ selectedIndex });
    if (this.messageTimer) clearInterval(this.messageTimer);
  };

  render() {
    const { selectedIndex } = this.state;
    const { hbwText } = this.props;
    return (
      <Column align="center" className="onboarding-messages">
        <img src={this.messages[selectedIndex]} height="300px" alt="" />
        <h4>{translationText(hbwText, `onboarding.title${selectedIndex + 1}`)}</h4>
        <p className="subtitle">{translationText(hbwText, `onboarding.description${selectedIndex + 1}`)}</p>
        <div className="nav-dots">
          {this.messages.map((item, index) => (
            <span
              onClick={() => this.selectItem(index)}
              key={index}
              className={index === selectedIndex ? 'active' : ''}
            />
          ))}
        </div>
      </Column>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
});

export default connect(mapStateToProps)(OnboardingMessages);
