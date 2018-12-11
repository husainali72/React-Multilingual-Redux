import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPermissionForNotifications, deleteToken, initializeFirebase } from './notification';
import { USER_PUSH_TOKEN, USER_PUSH_TOKEN_DELETE } from '../../redux/constants';
import {
  Avatar,
  Select,
  Row,
  Center,
  Modal,
  Badge,
  ProgressSpinner,
  Column,
  Button,
  ButtonGroup,
} from '../../components/Layout';
import Icon from '../../components/Icon';
import { translationText } from '../../helpers';
import { translationType } from '../../types';
import './test.scss';

// initializeFirebase();

class Test extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
  };

  state = {
    logoz: [
      'logo',
      'hbw-en',
      'hbw-ar',
      'sticker',
      'send',
      'mic',
      'silence',
      'vr',
      'chat',
      'star',
      'loader',
      'facebook',
      'twitter',
      'facebook-text',
      'twitter-text',
      'badge',
      'arrow-down',
      'idea',
      'question',
      'question-dartboard',
      'tutoring',
      'group-class',
      'home',
      'competition',
      'user',
      'user-upload',
      'group',
      'edit',
      'flashcard',
      'calendar',
      'live-class',
      'clock',
      'lock',
      'info',
      'correct',
      'wrong',
      'start-competition',
      'email',
      'qudrat',
      'qudrat-o',
      'tahsili',
      'tahsili-o',
      'dollar',
      'bell',
      'mocktest',
      'arrow-down-round',
      'book',
      'private',
      'grid-view',
      'card-view',
      'note',
      'menu',
      'female',
      'male',
      'plus',
      'study',
      'no-notification',
      'no-competition',
      'no-sessions',
      'add-user',
    ],
    drop: false,
    drop1: false,
    rating: 0,
  };

  handleGetPermissionForNotifications = async () => {
    const { sendUserPushToken } = this.props;
    const token = await getPermissionForNotifications();
    if (token) {
      sendUserPushToken(token);
    }
  };
  handleDeleteToken = async () => {
    const { deleteUserPushToken } = this.props;
    const token = await getPermissionForNotifications();
    deleteToken(token);
    if (token) {
      deleteUserPushToken(token);
    }
  };

  selectRating = (rating) => {
    this.setState({ rating });
  };

  render() {
    const { hbwText } = this.props;
    return (
      <div className="test" style={{ margin: '100px' }}>
        <br />
        <Button type="primary" onClick={this.handleGetPermissionForNotifications}>
          Test Add Notification
        </Button>
        <Button type="primary" onClick={this.handleDeleteToken}>
          Test Delete Notification
        </Button>
        <br />

        <h3>Icons</h3>
        <Row>
          {this.state.logoz.sort().map(item => (
            <Column align="center" justify="center" key={item} style={{ margin: '10px' }}>
              <Icon name={item} />
              <span>{item}</span>
            </Column>
          ))}
          <Icon name="wrong" color="#ff8000" stroke="#fff" />
        </Row>
        <br />
        <h3>Avatars</h3>
        <Avatar url="/assets/images/appLogo.png" showChild>
          <Icon name="qudrat" height="14px" width="14px" gradientFill="blue" />
        </Avatar>
        <Avatar size="42px" url="/assets/images/appLogo.png" />
        <Avatar size="72px" url="/assets/images/appLogo.png" />
        <Avatar size="126px" url="/assets/images/appLogo.png" showChild>
          <Icon name="qudrat" height="32px" width="32px" gradientFill="tahsili" />
        </Avatar>
        <br />

        <div className="rating-wrapper">
          {[1, 2, 3, 4, 5].map(value => (
            <span className="rating-item" key={value} onClick={() => this.selectRating(value)}>
              <Icon name={`rating-${value}`} height="50px" width="50px" fill="#a1a1a1" />
            </span>
          ))}
        </div>

        <h3>Badge</h3>
        <Row justify="space-sm">
          <Badge>Label</Badge>
          <Badge type="red" size="lg">
            Label lg
          </Badge>
          <Badge type="blue">Label default</Badge>
          <Badge type="green" size="md">
            Label md
          </Badge>
          <Badge type="default" size="sm">
            Label sm
          </Badge>
          <Badge type="blue" rounded value="6" />
          <Badge type="blue" rounded value="60" />
          <Badge type="blue" rounded value="978" />
          <Badge rounded value="9987" />
          <Badge type="blue" rounded value="99870" />
        </Row>

        <h3>Progress Spinners</h3>
        <Row justify="space-lg">
          <ProgressSpinner progress={65} text="65%" radius={60} />
          <ProgressSpinner progress={30} text="65%" radius={30} />
          <ProgressSpinner
            progress={30}
            text="30s"
            radius={40}
            noPointer
            noShadow
            activeColor="#1199ff"
            color="#1199ff"
          />
        </Row>

        <h3>Buttons</h3>
        <Row>
          <Column>
            <Button type="primary">Click Here</Button>
            <Button type="red">Click Here</Button>
            <Button type="green" size="medium">
              Click Here
            </Button>
            <Button size="small">Click Hedre</Button>
          </Column>
          <Column>
            <ButtonGroup>
              <Button type="blue">Click Here</Button>
              <Button type="blue">Click Here</Button>
              <Button type="blue">Click Here</Button>
            </ButtonGroup>
          </Column>
          <Column>
            <Button rounded outlined type="primary" size="large">
              outlined
            </Button>
            <Button rounded type="red" icon="tutoring">
              Click Here
            </Button>
            <Button rounded type="green" size="medium" faIcon="home" loading>
              Click Here
            </Button>
            <Button rounded size="small">
              Click Here
            </Button>
          </Column>
          <Column>
            <Button fab type="primary" size="large">
              d
            </Button>
            <Button fab type="red">
              d
            </Button>
            <Button fab type="green" size="medium">
              d
            </Button>
            <Button fab size="small">
              d
            </Button>
          </Column>
        </Row>
        <br />
        <h3>Typography</h3>
        <div style={{ width: '800px' }}>
          <h1>خلق الانسجام بين الخطوط العربية واللاتينية</h1>
          <h2>خلق الانسجام بين الخطوط العربية واللاتينية</h2>
          <h3>خلق الانسجام بين الخطوط العربية واللاتينية</h3>
          <h4>خلق الانسجام بين الخطوط العربية واللاتينية</h4>
          <h5>خلق الانسجام بين الخطوط العربية واللاتينية</h5>
          <h6>خلق الانسجام بين الخطوط العربية واللاتينية</h6>
        </div>
        <br />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum
          {translationText(hbwText, 'form.email')}
        </p>

        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  userPushToken: state.toJS().notification.userPushToken,
});

const mapStateToDispatch = dispatch => ({
  sendUserPushToken: token => dispatch({ type: USER_PUSH_TOKEN.REQUEST, payload: token }),
  deleteUserPushToken: () => dispatch({ type: USER_PUSH_TOKEN_DELETE.REQUEST }),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch,
)(Test);
