import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import '../css/chatBox.css';
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
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {
        if (roomId) {
            onSnapshot(doc(collection(db, 'chatRooms'), roomId), (snapshot) => (
                setRoomName(snapshot.data().name)
            ))

            const msgInAscOrder = query(collection(doc(collection(db, 'chatRooms'), roomId), 'messages'), orderBy("timestamp", "asc"));
            onSnapshot(msgInAscOrder, (snapshot) => (
                setMessages(snapshot.docs.map((doc) => (
                    doc.data()
                )))
            ))
        }
    }, [roomId]);

    const sendMsg = (e) => {
        e.preventDefault();
        addDoc(collection(doc(collection(db, 'chatRooms'), roomId), 'messages'), ({
            message: e.target.sendText.value,
            name: user.displayName,
            timestamp: serverTimestamp(),
        }));
        e.target.sendText.value = '';
    };

    return (
        <div className="chatBox">
            <header className="chatBox_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomName}.svg`} variant="rounded" />
                <div className="chatRoomInfo">
                    <h2>{roomName}</h2>
                </div>
                <div className="backLink">
                    <IconButton sx={{ p: '10px' }} aria-label="back" onClick={()=>history.push('/')} >
                        <ArrowBackIcon />
                    </IconButton>
                </div>
            </header>
            <div className="chatBox_body">
                <div className="msgDisplayBox">
                    {messages.map((each, index) => (
                        <div key={index} className={`msgBox ${each.name === user.displayName && 'msgReciver'}`}>
                            <span className="msgName">{each.name}</span>
                            <p className="msg">{each.message}</p>
                            <span className="msgInfo">{new Date(each.timestamp?.toDate()).toLocaleTimeString()}</span>
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
    );
}

export default ChatBox;