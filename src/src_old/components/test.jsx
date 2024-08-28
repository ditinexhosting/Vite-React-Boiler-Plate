import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Modal from 'react-modal';
import { gapi } from 'gapi-script';
import axios from 'axios';
import { Scene } from '@soulmachines/smwebsdk';

const Test = () => {



    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1>Test</h1>
           
            </div>
        </div>
    );
};


export default Test;
