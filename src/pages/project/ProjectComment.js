import React, { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext'

export default function ProjectComment() {
    const { user } = useAuthContext();
    const [newComment, setNewComment] = useState('')

    const submitHandler = async(e) => {
        e.preventDefault();

        //creating a commentToAdd object 
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            commentId: Math.random() //this is the id of the comment
        }
        console.log(commentToAdd);
    }
  return (
    <div className="project-comments">
        <h4>Project Comments</h4>
        <form className='add=comment' onSubmit={submitHandler}>
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
