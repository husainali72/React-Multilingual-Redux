import React from 'react';
import classNames from 'classnames';
import Icon from '../../components/Icon';

export default function Search(prop) {
  const { style, className, loading, ...rest } = prop;
  return (
    <div style={style} className={classNames('hbw-search', className)}>
      <input type="search" {...rest} />
      <Icon name={loading ? 'loader' : 'search'} />
    </div>
  );
}
