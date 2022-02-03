import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
//Styles
import "./ProjectList.css";
export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link to={`projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          {/** as date is in timeStamp form we need to convert it into js string */}
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                  <p>{user.displayName}</p>
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}