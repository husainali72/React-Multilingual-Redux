import React from 'react';
import classNames from 'classnames';

export default function TCard(prop) {
  return (
    <div
      style={{ padding: prop.spacing || prop.padding, height: prop.height, width: prop.width, ...prop.style }}
      className={classNames('hbw-t-card', prop.className)}
    >
      {prop.children}
      <div className="subject-wrapper">
        <div className="chapter-cover" />
        <div className="chapter-info">
          <p>Chapter Name</p>
          <h4>Chapter Description</h4>
        </div>
      </div>
    </div>
  );
}
