import React from 'react';
import Icon from '../Icon';
import { Badge } from '../Layout';

export default function QuestionCardPlaceholder() {
  return (
    <div className="hbw-card hbw-placeholder flex-column flex-nowrap practice-question">
      <div className="flex-row flex-nowrap justify-center align-center">
        <Icon name="question" />
        <span className="placeholder-subtitle placeholder-fade" />
        <div className="flex-1" />
        <span className="placeholder-rounded" />
      </div>
      <div className="flex-row flex-nowrap justify-center mt-4">
        <div className="placeholder-title placeholder-fade" />
      </div>
      <div className="mt-5 flex-row flex-nowrap justify-space-lg">
        <div className="placeholder-text placeholder-fade flex-1" />
        <div className="placeholder-text placeholder-fade flex-1" />
      </div>
      <div className="mt-2 flex-row flex-nowrap justify-space-lg">
        <div className="placeholder-text placeholder-fade flex-1" />
        <div className="placeholder-text placeholder-fade flex-1" />
      </div>
      <div className="mt-4 flex-center">
        <Badge type="default" style={{ width: '120px' }} />
      </div>
    </div>
  );
}
