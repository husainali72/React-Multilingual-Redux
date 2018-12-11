import React from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { isMobileOnly } from 'react-device-detect';
import Icon from '../Icon';
import { Column, Row, Button, Avatar, Badge, AvatarGroup, Time, LiveTime } from '../Layout';
import { translationText } from '../../helpers';

export default function SessionCard(prop) {
  const { session, style, className, hbwText, sessionEvent, isLoading, showType } = prop;
  const ondemand = !!session.student_id;
  const live = ondemand || session.state === 'started';
  return (
    <Row align="center" style={style} className={classNames('hbw-session-card', className)}>
      {showType && !isMobileOnly && (
        <Icon
          className="session-class-type"
          name={session.class_type === 'competition' ? 'competition' : 'group-class'}
        />
      )}
      {!prop.teacher && (
        <Avatar
          url={ondemand && isEmpty(session.teacher) ? session.owner.profile_pic : session.teacher.profile_pic}
          gender={ondemand && isEmpty(session.teacher) ? session.owner.gender : session.teacher.gender}
          showChild={!!prop.productImage}
          size="72px"
          teacher
        >
          <img src={prop.productImage} alt="product" height="22px" />
        </Avatar>
      )}
      <Column flex="1">
        <span className="chapter-name">{session.title}</span>
        {!prop.teacher && !isEmpty(session.teacher) && <span className="teacher-name"> أ/ {session.teacher.name}</span>}
        {!prop.teacher && ondemand && isEmpty(session.teacher) && (
          <span className="teacher-name">{session.owner.name}</span>
        )}
        <Row align="center" className={classNames('session-detail', { live })}>
          <Icon name={live ? 'live-class' : 'clock'} />
          {live && (
            <Badge color="red" size="sm">
              <LiveTime value={session.teacher_arrival_time || session.start_time} />
            </Badge>
          )}
          {!live && <Time value={session.start_time} unit="timestamp" suffix />}
          <AvatarGroup list={session.students} count={session.total_students} size={isMobileOnly ? '20px' : '26px'} />
        </Row>
      </Column>
      <Column nowrap align="center">
        {showType && isMobileOnly && (
          <Icon
            className="session-class-type"
            name={session.class_type === 'competition' ? 'competition' : 'group-class'}
          />
        )}
        {live && (
          <Button
            onClick={() => sessionEvent('goToClass', session)}
            type="red"
            outlined
            size="md"
            value={translationText(hbwText, 'button.join')}
            to={`/class/${session.id}`}
          />
        )}
        {!live && session.myState === '' && (
          <Button
            onClick={() => sessionEvent('subscribe', session)}
            outlined
            loading={isLoading === session.id}
            icon={prop.session.is_eligible || isMobileOnly ? '' : 'private'}
            size="md"
            value={translationText(hbwText, 'button.bookSeat')}
          />
        )}
        {!live && session.myState !== '' && (
          <Button
            loading={isLoading === session.id}
            onClick={() => sessionEvent('unsubscribe', session)}
            type="green"
            size="md"
          >
            {!isMobileOnly && <Icon name="correct" stroke="#fff" fill="transparent" />}
            {translationText(hbwText, 'button.booked')}
          </Button>
        )}
      </Column>
    </Row>
  );
}
