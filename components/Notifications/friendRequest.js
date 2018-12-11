import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Column, Row, Avatar, Button, Hr } from '../Layout';
import Icon from '../Icon';
import { CardHeader } from '../Dashboard';
import { translationText } from '../../helpers';

export default function FriendActivity(prop) {
  return (
    <Column className="friend-request-container">
      <CardHeader text={translationText(prop.hbwText, 'label.friendRequests')} />
      {prop.pendingRequest.map((friend, index) => (
        <Column key={friend.id}>
          <Row align="center" justify="end" nowrap className="friend-request-item">
            <Avatar url={friend.profile_pic} gender={friend.gender} size="36px" />
            <div className="player-info flex-1">
              <div className="player-title">{friend.name}</div>
              {!isEmpty(friend.school) && <div className="player-subtitle">{friend.school.name}</div>}
            </div>
            <Row nowrap align="center" justify="space-sm">
              {!friend.accepted && (
                <Button type="primary" size="small" onClick={() => prop.acceptFriendRequest(friend.id)}>
                  {translationText(prop.hbwText, 'button.acceptRequest')}
                </Button>
              )}
              {friend.accepted && (
                <Button type="green" size="small" disabled>
                  <Icon name="correct" fill="transparent" />
                  {translationText(prop.hbwText, 'button.acceptRequest')}
                </Button>
              )}
              {!friend.accepted && (
                <Button size="small" onClick={() => prop.rejectFriendRequest(friend.id)}>
                  {translationText(prop.hbwText, 'button.reject')}
                </Button>
              )}
            </Row>
          </Row>
          {prop.pendingRequest.length !== index + 1 && <Hr width="90%" />}
        </Column>
      ))}
    </Column>
  );
}
