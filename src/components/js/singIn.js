import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from '../../logo.png';
import { auth, provider, signInWithPopup } from '../../firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './stateProvider';

export default function SignIn() {
    const [{}, dispatch] = useStateValue();

    const singIn = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider).then((res) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user,
            });
        }).catch((err) => {
            alert(err.message);
        });
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: '1rem 6rem',
                backgroundColor: '#f0f2fa',
                boxShadow: '0rem 0rem 1rem 0.5rem #d8deec',
            }}
        >
            <Typography component="h1" variant="h1" sx={{ 
                m: 3,
                fontFamily: '"Caveat", cursive',
                fontSize: '5rem',
                color: '#ed6d66',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
             }}>
                <img src={logo} alt="app logo" className="app_logo" />
                sandese
            </Typography>
            <Typography component="h1" variant="h5">
                Please sing in to become user of sandese
            </Typography>
            <Button
                variant="contained"
                sx={{ m: 3, p: '1rem 3rem' }}
                onClick={singIn}
            >
                Sign In with google
            </Button>
        </Box>
    );
}