import React, { useState, useEffect } from 'react';
import './Login.css';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Modal from 'react-modal';
import { gapi } from 'gapi-script';
import axios from 'axios';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then(
            (response) => {
                navigate('/sue');
                
                
            },
            (error) => {
                navigate('/invalid_login');
            }
        );
    };

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: '220571796003-t05kosoed3toluq4ebonr7s2u4k4tsf5.apps.googleusercontent.com',
                scope: 'profile email'
            });
        };
        gapi.load('client:auth2', initClient);
    }, []);

    const handleLoginSuccess = async (response) => {
        const userDetails = response.profileObj;
        const googleToken = response.tokenId;
        const backendResponse = await axios.post('/api/google-login/', {
            token: googleToken,
        });

        // Save the JWT tokens in local storage or cookies
        // localStorage.setItem('access_token', backendResponse.data.access);
        localStorage.setItem('jwtToken', backendResponse.data.access);
        // localStorage.setItem('refresh_token', backendResponse.data.refresh);
        setUserDetails(userDetails);
        setModalIsOpen(true);
        console.log('Login Success:', userDetails);
        navigate('/sue')
    };

    const handleLoginFailure = (response) => {
        console.log('Login Failed:', response);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };


    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="Email"
                        className="input-box"
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        className="input-box"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                
                <a href="#" className="forgot-password">Forgot your password?</a>
                    <button type="submit" className="signin-button">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <GoogleLogin
                    clientId="YOUR_GOOGLE_CLIENT_ID"
                    buttonText="Login with Google"
                    onSuccess={handleLoginSuccess}
                    onFailure={handleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    className="google-signin-button"
                />
                <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Login Success"
                className="modal"
                overlayClassName="modal-overlay"
            >
                {userDetails && (
                    <div className="modal-content">
                        <h2>Successfully Logged In</h2>
                        <p>Welcome, {userDetails.name}</p>
                        <p>Email: {userDetails.email}</p>
                        <button onClick={closeModal} className="close-modal-button">Close</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};


export default SignIn;
