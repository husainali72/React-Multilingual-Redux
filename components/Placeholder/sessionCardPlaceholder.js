import React from 'react';
import Icon from '../../components/Icon';

export default function SessionCardPlaceholder() {
  return (
    <div className="hbw-placeholder flex-row flex-nowrap mt-1 mb-1">
      <Icon name="squircle" height="72px" width="72px" />
      <div className="flex-column flex-nowrap justify-center">
        <div className="placeholder-title placeholder-fade" />
        <div className="mt-1 placeholder-subtitle placeholder-fade" />
        <div className="mt-1 flex-row flex-nowrap align-center">
          <Icon name="squircle" height="20px" width="20px" />
          <span className="placeholder-text placeholder-fade" />
        </div>
      </div>
    </div>
  );
}
