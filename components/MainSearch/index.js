import React from 'react';
import Icon from '../Icon';

export default function MainSearch(prop) {
  return (
    <div className="hbw-main-search" onClick={() => prop.toggleFriendSearchModal(true)}>
      <Icon name="search" height="25px" />
    </div>
  );
}
