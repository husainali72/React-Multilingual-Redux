import React from 'react';
import Icon from '../Icon';

export default function SubjectSelectorPlaceholder() {
  return (
    <div className="hbw-placeholder flex-row flex-nowrap align-center full">
      <Icon name="squircle" height="50px" width="50px" />
      <div className="flex-column flex-nowrap justify-center flex-1 placeholder-content">
        <div className="placeholder-title placeholder-fade placeholder-80" />
        <div className="placeholder-text placeholder-fade placeholder-50 mt-1" />
      </div>
    </div>
  );
}
