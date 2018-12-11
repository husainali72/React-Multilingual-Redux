import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { translationText } from '../../helpers';
import { Button, Avatar, Card } from '../Layout';
import { userType, translationType } from '../../types';
import { CREATE_CLASS_SIDEBAR } from '../../redux/constants';

class ProfileWidget extends Component {
  static propTypes = {
    user: userType.isRequired,
    hbwText: translationType.isRequired,
    openActionMenu: PropTypes.func.isRequired,
  };

  render() {
    const { user, hbwText, openActionMenu } = this.props;
    return (
      <Card className="profile-widget-wrapper">
        <div className="profile-widget-header">
          <div className="image-wrapper">
            <img src="/assets/images/profile-bg.jpg" alt="" />
          </div>
          <div className="badge-ribbon" />
        </div>
        <div className="profile-widget-body">
          <Avatar size="96px" url={user.profile_pic} gender={user.gender} />
          {!isEmpty(user) && (
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>
                {!isEmpty(user.school) && <span>{user.school.name}</span>}
              </p>
              <p>
                {!!user.grade && <span>{translationText(hbwText, `grade.${user.grade}`)}</span>}
                {!!user.grade && !!user.city && ' - '}
                {!!user.city && <span>{user.city}</span>}
              </p>
            </div>
          )}
        </div>
        <div className="flex-row nowrap profile-widget-footer">
          <Button icon="tutoring" type="primary" size="xl" onClick={() => openActionMenu({ class_type: 'group' })}>
            {translationText(hbwText, 'button.tutoring')}
          </Button>
          <Button
            icon="start-competition"
            type="voilet"
            size="xl"
            onClick={() => openActionMenu({ class_type: 'competition' })}
          >
            {translationText(hbwText, 'button.competition')}
          </Button>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.toJS().user.loggedUser,
  hbwText: state.toJS().translation.hbwText,
});

const mapDispatchToProps = dispatch => ({
  openActionMenu: data => dispatch({ type: CREATE_CLASS_SIDEBAR.OPEN, payload: data }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileWidget);
