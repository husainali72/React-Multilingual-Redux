import React from 'react';
import classNames from 'classnames';
import { Column, Row, Avatar, Hr } from '../Layout';

export const FeedTime = prop => '17 JUL - 3:00 PM' || prop.value;

export default function FeedHeader(prop) {
  return (
    <Column align="end">
      <Row align="center" style={prop.style} className={classNames('hbw-feed-header mb-2', prop.className)}>
        <Avatar url={prop.user.image_uri} size="42px" />
        <Column flex="1 1 auto">
          <span className="heading-name">{prop.user.name}</span>
          <span className="heading-message">{prop.message}</span>
        </Column>
        <FeedTime value={prop.time} />
      </Row>
      {!prop.noHr && <Hr width="90%" />}
    </Column>
  );
}
