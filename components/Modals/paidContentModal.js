import React from 'react';
import { Modal, Button, Row } from '../Layout';
import { translationText } from '../../helpers';

export default function PaidContentModal(prop) {
  return (
    <Modal title={translationText(prop.hbwText, 'packages.subscribeNow')} onClose={prop.onClose}>
      <div className="modal-body">
        <p>{translationText(prop.hbwText, 'packages.contentForSubscribersOnly')}</p>
      </div>
      <Row className="mt-1 mb-1 text-center" align="center" justify="space-around">
        <Button type="primary" to="/pricing">
          {translationText(prop.hbwText, 'packages.findAboutMembership')}
        </Button>
        <Button onClick={prop.onClose}>{translationText(prop.hbwText, 'packages.notNow')}</Button>
      </Row>
    </Modal>
  );
}
