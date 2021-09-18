import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { db, collection, addDoc } from '../../firebase';

export default function AddNewChat() {
    const [open, setOpen] = useState(false);
    const [roomName, setRoomName] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createChatRoom = () => {
        if (roomName) {
            addDoc(collection(db, 'chatRooms'), {
                name: roomName,
            });
        }
        setRoomName('');
        setOpen(false);
    };

    return (
        <div style={{ display: 'inline-block' }}>
            <Button
                sx={{ fontSize: '1.5rem', borderTop: '1px solid #fff', borderBottom: '1px solid #fff', width: '100%' }}
                variant="text"
                aria-label="add new chat"
                onClick={handleClickOpen}
            >
                add new chat
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Chat</DialogTitle>
                <DialogContent sx={{ py: 0 }} >
                    <DialogContentText>
                        Please enter the name of chat room you want to create.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: '#000' }} aria-label="cancel" onClick={handleClose}>Cancel</Button>
                    <Button aria-label="create" onClick={createChatRoom}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}