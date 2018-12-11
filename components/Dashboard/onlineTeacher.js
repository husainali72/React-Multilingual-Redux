import React from 'react';
import { Column, Row, Avatar, Badge } from '../../components/Layout';

export default function OnlineTeacher(prop) {
  const { list, onSelect, requestedTeacherSidebar } = prop;
  return (
    <Row nowrap justify="start" align="start" className="online-teacher-list">
      {list.map((teacher, index) => (
        <Column
          onClick={() => onSelect(teacher)}
          justify="center"
          align="center"
          key={index}
          className="online-teacher-list-item animated fadeIn"
        >
          <Avatar
            size="72px"
            url={teacher.profilePic}
            teacher
            showChild
            loading={teacher.userId === requestedTeacherSidebar}
          >
            <React.Fragment>
              {teacher.status === 'online' && <Badge color="green" rounded size="small" />}
              {teacher.status === 'busy' && <Badge color="red" rounded size="small" />}
            </React.Fragment>
          </Avatar>
          <span className="teacher-name">{teacher.name}</span>
        </Column>
      ))}
    </Row>
  );
}
