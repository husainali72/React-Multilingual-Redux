import React from 'react';
import { Row } from '../../Layout';
import { translationText, Serializer } from '../../../helpers';

export default function Teachers(prop) {
  const teachers = prop.list;
  const hbwText = prop.hbwText;
  return (
    <section className="teachers-sec">
      <Row>
        <div className="container-teachers">
          {teachers.map((teacher, index) => (
            <div key={`teacher-${index}`} className="teacher-profile">
              <div className="image-outer">
                <img src={teacher.profile_pic} className="teach-image" />
              </div>
              <h4 className="smallHeading">{teacher.name}</h4>
              {/* <h6 className="smallSubheading">{teacher.about_me}</h6> */}
            </div>
          ))}
        </div>
      </Row>
    </section>
  );
}
