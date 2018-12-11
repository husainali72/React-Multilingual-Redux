import React from 'react';
import classNames from 'classnames';
import Icon from '../../components/Icon';
import { Hr, Column } from '../../components/Layout';

export default function Input(prop) {
  const { label, style, className, children, icon, error, ...rest } = prop;
  return (
    <div style={style} className={classNames('hbw-form-input', { error: !!error }, className)}>
      <label htmlFor={prop.id} className="label">
        {label}
      </label>
      <input {...rest} />
      <Hr />
      <Column nowrap align="center" className="extra-info">
        {!!icon && <Icon name={icon} height="24px" />}
        {children}
      </Column>
    </div>
  );
}
