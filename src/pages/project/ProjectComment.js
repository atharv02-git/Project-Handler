import React, { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function ProjectComment({ project }) {
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const [newComment, setNewComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    //creating a commentToAdd object
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      commentId: Math.random(), //this is the id of the comment
    };
    updateDocument(project.id, {
      //where id is the id of the project
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      <form className="add=comment" onSubmit={submitHandler}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}
