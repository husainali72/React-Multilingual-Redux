import React from 'react';
import classNames from 'classnames';

export default function Checkbox(prop) {
  const { label, style, className, children, ...rest } = prop;
  return (
    <label style={prop.style} className={classNames('hbw-form-checkbox', prop.className)}>
      <input type="checkbox" {...rest} /> {label}
      {children}
      <span className="custom-checkbox" />
    </label>
  );
}
