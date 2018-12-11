import React from 'react';
import classNames from 'classnames';
import { Row } from '../../components/Layout';
import Icon from '../Icon';

export function RadioGroup(prop) {
  return (
    <div style={prop.style} className={classNames('hbw-form-radio-group', prop.className)}>
      <span className="label">{prop.label}</span>
      <Row className="mt-1">{prop.children}</Row>
    </div>
  );
}

export default function Radio(prop) {
  const { label, style, className, children, icon, ...rest } = prop;
  return (
    <label style={prop.style} className={classNames('hbw-form-radio', prop.className)}>
      <input type="radio" {...rest} />
      {icon && <Icon name={icon} height="20px" width="20px" />}
      {label}
      {children}
      {!icon && <span className="custom-radio" />}
    </label>
  );
}
