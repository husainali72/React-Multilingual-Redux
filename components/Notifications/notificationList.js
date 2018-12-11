import React from 'react';
import FriendRequest from './friendRequest';
import { translationText } from '../../helpers';
import FriendActivity from './friendActivity';
import Icon from '../../components/Icon';

export default function NotificationList(prop) {
  return (
    <div className="notification-list">
      {/* If no request hide this */}
      {!!prop.pendingRequest.length && <FriendRequest {...prop} />}

      {/* If no notification hide this */}
      {!!prop.notifications.length && <FriendActivity {...prop} />}

      {/* If nothing show this */}
      {!prop.pendingRequest.length && !prop.notifications.length && (
        <div className="empty-slate flex-column flex-nowrap align-center">
          <Icon name="no-notification" color="#919a9e" width="50px" height="50px" />
          <p className="no-data text-center">{translationText(prop.hbwText, 'social.noNotification')}</p>
        </div>
      )}
    </div>
  );
}
