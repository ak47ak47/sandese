import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import '../css/chatBox.css';
import Menu from './Menu';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useParams } from "react-router-dom";
import { db, doc, query, addDoc, orderBy, collection, onSnapshot, serverTimestamp } from '../../firebase';
import { useStateValue } from './stateProvider';
import EmojiModal from './emojiModal';

function ChatBox() {
    const history = useHistory();
    const { roomId } = useParams();
    const [{ user }] = useStateValue();
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const capitalize = (str) => str && str[0].toUpperCase() + str.slice(1).toLowerCase();

    useEffect(() => {
        if (roomId) {
            const unsubscribeRoom = onSnapshot(doc(collection(db, 'chatRooms'), roomId), (snapshot) => (
                setRoom(snapshot.data())
            ), (error) => (error));

            const msgInAscOrder = query(collection(doc(collection(db, 'chatRooms'), roomId), 'messages'), orderBy("timestamp", "asc"));
            const unsubscribeMsg = onSnapshot(msgInAscOrder, (snapshot) => (
                setMessages(snapshot.docs.map((doc) => (
                    doc.data()
                )))
            ), (error) => (error));

            return () => {
                unsubscribeRoom();
                unsubscribeMsg();
            }
        }
    }, [roomId]);

    const sendMsg = (e) => {
        e.preventDefault();
        addDoc(collection(doc(collection(db, 'chatRooms'), roomId), 'messages'), ({
            uid: user.uid,
            name: user.uid === 'pulI8nprxOV7BMWnHQcMls1pMWN2' ? 'Guest' : user.displayName,
            message: e.target.sendText.value,
            timestamp: serverTimestamp(),
        }));
        e.target.sendText.value = '';
    };

    return (
        <>
            {roomId ? (
                <div className="chatBox">
                    <header className="chatBox_header">
                        <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} variant="rounded" />
                        <div className="chatRoomInfo">
                            <h2>{room.name}</h2>
                        </div>
                        <div className="backLink">
                            <IconButton sx={{ p: '10px' }} aria-label="back" onClick={() => history.push('/')} >
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        {user.uid === room.creator && <Menu roomId={roomId} />}
                    </header>
                    <div className="chatBox_body">
                        <div className="msgDisplayBox">
                            {messages.map((each, index) => (
                                <div key={index} className={`msgBox ${each.uid === user.uid && 'msgReciver'}`}>
                                    <span className="msgName">{capitalize(each.name)}</span>
                                    <p className="msg">{each.message}</p>
                                    <span className="msgInfo">{new Date(each.timestamp?.toDate()).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <footer className="chatBox_footer">
                        <EmojiModal />
                        <Paper
                            component="form"
                            sx={{ display: 'flex', flex: 1, alignItems: 'center', boxShadow: 'none' }}
                            onSubmit={sendMsg}
                        >
                            <InputBase
                                sx={{ px: 1, flex: 1 }}
                                placeholder="Write a message"
                                inputProps={{ 'aria-label': 'write a message' }}
                                name="sendText"
                                id="textField"
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="send">
                                <ArrowUpwardIcon />
                            </IconButton>
                        </Paper>
                    </footer>
                </div>
            ) : (
                <div className="emptyBox">
                    <p className="emptyBoxMsg">Select a chat room to see messages.</p>
                </div>
            )}
        </>
    );
}

export default ChatBox;