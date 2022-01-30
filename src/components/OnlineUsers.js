import React from 'react';
// hooks
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';
// styles
import './OnlineUsers.css'

export default function OnlineUsers() {
    const {isPending, error, document} = useCollection('users'); 
  return (
    <div className="user-list">
        <h2>All Users</h2> 
        {isPending && <div>Loading users...</div>}
        {error && <div className="error">{error}</div>} 
        {document && document.map(user => (
            <div key={user.id} className='user-list-item'> {/* where id is the document id  */}
                {user.online && <span className='online-user'></span>} {/** Online status of the user */}
                <span>{user.displayName}</span>
                <Avatar src={ user.photoURL }/> {/* where src is the prop we defiend */}
            </div>
        ))}
    </div>
  );
}