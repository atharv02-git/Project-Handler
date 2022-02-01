import React from "react";
import Avatar from "../../components/Avatar";

export default function ProjectSummary({ project }) {
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">{project.dueDate.toDate().toDateString()}</p>
        <p className="details">{project.details}</p>
        <h4 className="assigned-to">Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
              <p>{user.displayName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
