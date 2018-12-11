import React from 'react';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { Column, Row, Avatar, Button, Hr, Time, HBWDate } from '../Layout';
import { SessionCardContainer } from '../Dashboard';
import { translationText, getObjectByProperty } from '../../helpers';
import Icon from '../Icon';

export default function FriendActivity(prop) {
  const { hbwText, products, readNotification } = prop;
  return (
    <Column className="friend-request-container">
      <Hr />
      <div className="seperator" />
      <Hr />
      <SessionCardContainer>
        {({ sessionEvent, isLoading }) => (
          <React.Fragment>
            {prop.notifications.map((notification, index) => {
              const selectedProduct = getObjectByProperty(
                products,
                'id',
                Number(notification.notification_feed.meta_data.product_id),
              );
              return (
                <Column
                  key={notification.notification_feed.UUID}
                  onClick={() =>
                    !notification.notification_feed.notification_viewed &&
                    readNotification({
                      feed_type: 'notification',
                      notificationstatus: true,
                      notification_uid: notification.notification_feed.UUID,
                    })
                  }
                >
                  <Row
                    align="center"
                    justify="end"
                    nowrap
                    className={classNames('friend-request-item', {
                      'new-notification': !notification.notification_feed.notification_viewed,
                    })}
                  >
                    {notification.notification_feed.event_type === 'publish_session' &&
                      notification.notification_feed.meta_data.class_type === 'competition' && (
                        <Icon name="competition" />
                      )}
                    {notification.notification_feed.event_type === 'publish_session' &&
                      notification.notification_feed.meta_data.class_type === 'group' && <Icon name="group-class" />}
                    {notification.notification_feed.event_type === 'start_session' && <Icon name="live-class" />}
                    {notification.notification_feed.event_group === 'user' && <Icon name="user" />}

                    <Avatar
                      url={notification.notification_feed.meta_data.profile_pic}
                      gender={notification.notification_feed.meta_data.gender}
                      size="36px"
                      showChild={!isEmpty(selectedProduct)}
                    >
                      <img src={selectedProduct.image_thumbnail_uri} alt="product" height="18px" />
                    </Avatar>
                    <div className="player-info flex-auto">
                      <div className="player-title">
                        {notification.notification_feed.meta_data.notification_message}
                      </div>
                      {!isEmpty(notification.notification_feed.meta_data.school) && (
                        <div className="player-subtitle">{notification.notification_feed.meta_data.school.name}</div>
                      )}
                      <Row align="center" className="notification-time">
                        <HBWDate
                          humanize
                          value={new Date(notification.notification_feed.created_at).toISOString()}
                          short
                        />
                        <Time value={notification.notification_feed.created_at} unit="epoch" suffix />
                      </Row>
                    </div>

                    <Row nowrap align="center" justify="space-sm">
                      {notification.notification_feed.event_type === 'publish_session' &&
                        !notification.notification_feed.subscription && (
                          <Button
                            type="primary"
                            size="small"
                            loading={isLoading === notification.notification_feed.meta_data.tutoring_logger_id}
                            onClick={() => sessionEvent('subscribe', notification.notification_feed.meta_data)}
                          >
                            {translationText(hbwText, 'button.bookSeat')}
                          </Button>
                        )}
                      {notification.notification_feed.event_type === 'publish_session' &&
                        notification.notification_feed.subscription && (
                          <Button
                            type="green"
                            size="small"
                            loading={isLoading === notification.notification_feed.meta_data.tutoring_logger_id}
                            onClick={() => sessionEvent('unsubscribe', notification.notification_feed.meta_data)}
                          >
                            <Icon name="correct" fill="transparent" />
                            {translationText(hbwText, 'button.booked')}
                          </Button>
                        )}
                      {notification.notification_feed.event_type === 'start_session' && (
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => sessionEvent('goToClass', notification.notification_feed.meta_data)}
                        >
                          {translationText(hbwText, 'button.join')}
                        </Button>
                      )}
                      {notification.notification_feed.event_type === 'student_register' &&
                        notification.notification_feed.friend_relation === 'no_relation' && (
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => prop.sendRequest([notification.notification_feed.meta_data.user_id])}
                          >
                            {translationText(prop.hbwText, 'button.sendRequest')}
                          </Button>
                        )}
                      {notification.notification_feed.event_type === 'student_register' &&
                        notification.notification_feed.friend_relation === 'request_sent' && (
                          <Button type="green" size="small" disabled>
                            <Icon name="correct" fill="transparent" />
                            {translationText(prop.hbwText, 'label.requestSent')}
                          </Button>
                        )}
                      {notification.notification_feed.event_type === 'student_register' &&
                        notification.notification_feed.friend_relation === 'friend' && (
                          <Button type="green" size="small" disabled>
                            <Icon name="correct" fill="transparent" />
                            {translationText(prop.hbwText, 'label.requestAccepted')}
                          </Button>
                        )}
                      {notification.notification_feed.event_type === 'student_register' &&
                        notification.notification_feed.friend_relation === 'rejected' && (
                          <Button type="red" size="small" disabled>
                            <Icon name="wrong" fill="transparent" />
                            {translationText(prop.hbwText, 'label.rejected')}
                          </Button>
                        )}
                      {notification.notification_feed.event_type === 'teacher_register' &&
                        !notification.notification_feed.following && (
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => prop.follow(notification.notification_feed.meta_data.user_id)}
                          >
                            {translationText(prop.hbwText, 'button.follow')}
                          </Button>
                        )}
                      {notification.notification_feed.event_type === 'teacher_register' &&
                        notification.notification_feed.following && (
                          <Button
                            type="green"
                            size="small"
                            onClick={() => prop.unfollow(notification.notification_feed.meta_data.user_id)}
                          >
                            <Icon name="correct" fill="transparent" />
                            {translationText(prop.hbwText, 'button.following')}
                          </Button>
                        )}
                    </Row>
                  </Row>
                  {prop.notifications.length !== index + 1 && <Hr width="90%" />}
                </Column>
              );
            })}
          </React.Fragment>
        )}
      </SessionCardContainer>
    </Column>
  );
}
