import React from 'react';
import '../css/chatRoom.css';
import Avatar from '@mui/material/Avatar';
import { Link  } from "react-router-dom";

function chatRoom({ id, name }) {
    return (
        <Link to={`/rooms/${id}`} style={{ textDecoration: 'none' }}>
            <div className="chatRoom">
                <Avatar src={`https://avatars.dicebear.com/api/human/${name}.svg`} variant="rounded" />
                <div className="chatRoomInfo">
                    <h2>{name}</h2>
                </div>
            </div>
        </Link>
    );
}

export default chatRoom;