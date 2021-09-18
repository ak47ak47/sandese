import React, { useState, useEffect } from 'react';
import '../css/sideBox.css';
import Avatar from '@mui/material/Avatar';
import ChatRoom from './chatRoom';
import AddNewChat from './addNewChat';
import { db, collection, onSnapshot } from '../../firebase';
import { useStateValue } from './stateProvider';

function SideBox() {
    const [rooms, setRooms] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'chatRooms'), (snapshots) => (
            setRooms(snapshots.docs.map((doc) => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ));

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="sideBox">
            <header className="sideBox_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${user.displayName}.svg`} variant="rounded" />
                <div className="chatRoomInfo">
                    <h1>{user.displayName}</h1>
                </div>
            </header>
            <AddNewChat />
            <div className="sideBox_chatRoom">
                <div className="chatRoomBox">
                    {rooms.map((room) => (
                        <ChatRoom key={room.id} id={room.id} name={room.data.name} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SideBox;