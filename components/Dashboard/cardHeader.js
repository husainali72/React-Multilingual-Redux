import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { Column, Row, Button, Hr } from '../Layout';

export default function CardHeader(prop) {
  const isRtl = document.body.dir === 'rtl';
  return (
    <Column>
      <Row align="center" style={prop.style} className={classNames('hbw-card-header', prop.className)}>
        <h4 className="flex-auto" style={{ color: prop.color }}>
          {!!prop.icon && <Icon name={prop.icon} fill={prop.iconColor} stroke={prop.iconColor} />}
          {!!prop.faIcon &&
            !prop.icon && (
              <i className={classNames('fa fa-lg', `fa-${prop.faIcon}`)} style={{ color: prop.iconColor }} />
            )}
          {prop.text}
          <small>{prop.children}</small>
        </h4>
        {!!prop.moreBtn && (
          <Button type="link" onClick={prop.onClick}>
            {prop.moreBtn} <Icon name="arrow-down-round" fill="#fff" rotate={isRtl ? 90 : 270} />
          </Button>
        )}
        {!!prop.lessBtn && (
          <Button fab type="link" onClick={prop.onClick}>
            <Icon
              name="arrow-down-round"
              style={{ height: '28px', width: '30px' }}
              fill="#fff"
              rotate={isRtl ? 270 : 90}
            />
          </Button>
        )}
      </Row>
      {!prop.noHr && <Hr />}
    </Column>
  );
}
