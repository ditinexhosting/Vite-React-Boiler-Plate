import React, { useEffect, useState, useRef } from 'react';
import { Scene, Persona } from '@soulmachines/smwebsdk';
import { useNavigate } from 'react-router-dom';
import './Sue_ddna.css';
import AuthService from '../services/auth.service';
import cc from '../assets/cc.png';
import settings from '../assets/settings.png';
import summary from '../assets/summary.png';
import Mic from '../assets/mic_working.png';
import MicSlashed from '../assets/mic_slashed.png';
import Speaker from '../assets/speaker.png';
import SpeakerSlashed from '../assets/speaker_slashed.png';
import AudioWave from '../assets/audio_wave.png';
import Menu from '../assets/menu.png';
import Back from '../assets/back.png';
import Upload from '../assets/upload.png';
import Play from '../assets/play_button.png';
import Loader from './Loader';


const SoulMachineComponent = () => {
  const apiKey = 'eyJzb3VsSWQiOiJkZG5hLXJvYi1saW5lcy1vcmdjZjE3LS1zdWVkZXBsb3ltZW50IiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfNTY3YmMwMjEtZjQ4Ny00MzhkLTgzMDMtNmVlYTA2ZTI5N2NjIn0=';
  const sceneRef = useRef(null);
  const personaRef = useRef(null);
  const pushKeyStateRef = useRef(null);
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [profile, setProfile] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isSoundOff, setSoundOff] = useState(false);
  const [conversationState, setConversationState] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarContent, setSidebarContent] = useState('menu');
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [aiCompany, setAiCompany] = useState('');
  const [aiRole, setAiRole] = useState('');
  const [outcome, setOutcome] = useState('');
  const [isVideoLoading,setIsVideoLoading] = useState(true)



  useEffect(() => {
    // Attempt to connect and autoplay on page load
    const attemptAutoConnect = async () => {
      try {
        await connect();
      } catch (error) {
        setConnectionFailed(true);
      }
    };

    attemptAutoConnect();
  }, []);

  useEffect(() => {
    setLoading(true);
    AuthService.getUserProfile().then(
      (response) => {
        setProfile(response.data);
        setLoading(false);
      },
      (error) => {
        console.log("Error fetching user profile:", error);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handlePushToTalk);
    document.addEventListener('keyup', handlePushToTalk);

    return () => {
      document.removeEventListener('keydown', handlePushToTalk);
      document.removeEventListener('keyup', handlePushToTalk);
    };
  }, []);

  useEffect(()=>{
    if(sceneRef.current){
    sceneRef.current.onRecognizeResultsEvent.addListener(recognizeListener);
    sceneRef.current.onStateEvent.addListener(stateListener);
    sceneRef.current.conversation.onConversationStateUpdated.addListener(conversationStateListener);

    // Cleanup listeners when component unmounts or scene disconnects
    return () => {
      sceneRef.current.onRecognizeResultsEvent.removeListener(recognizeListener);
      sceneRef.current.onStateEvent.removeListener(stateListener);
      sceneRef.current.conversation.onConversationStateUpdated.removeListener(conversationStateListener);
    };
  }
  },[sceneRef.current])


  const connect = async () => {
    const videoEl = document.getElementById('sm-video');
    const scene = new Scene({
      apiKey: apiKey,
      videoElement: videoEl,
      requestedMediaDevices: { microphone: true, camera: false },
      requiredMediaDevices: { microphone: true, camera: false },
    });
    sceneRef.current = scene;

    try {
      const sessionId = await scene.connect();
      onConnectionSuccess(sessionId);
    } catch (error) {
      console.log("Sue Error",error)
      onConnectionError(error);
    }
  };

  const onConnectionSuccess = async (sessionId) => {
    console.info('success! session id:', sessionId);
    try {
      // Setting default mic to false
      sceneRef.current.setMediaDeviceActive({
        microphone: false,
      });
      // Adding a persona instance so that we can dynamically shut her mouth :D
      personaRef.current = new Persona(sceneRef.current, sceneRef.current.currentPersonaId)

      await sceneRef.current.startVideo();
      
      setConnectionFailed(false);
      setIsVideoLoading(false);
    } catch (error) {
      console.warn('could not start video:', error);
      setConnectionFailed(true);
    }
  };

  const onConnectionError = (error) => {
    console.warn('Connection error:', error);
    setConnectionFailed(true);
  };

  const recognizeListener = (scene, status, errorMessage, results) => {
    const result = results[0];
    const userSpeech = result.alternatives[0].transcript;

    if (result.final === true) {
      console.log('[userSpeech] user said:', userSpeech);
      setTranscript((prevTranscript) => [...prevTranscript, { source: 'user', text: userSpeech }]);
    }
  };

  const stateListener = (scene, event) => {
    const personaState = event.persona?.['1'];

    if (personaState?.speechState === 'speaking') {
      const personaSpeech = personaState?.currentSpeech;
      console.log('[personaSpeech]', personaSpeech);
      setTranscript((prevTranscript) => [...prevTranscript, { source: 'persona', text: personaSpeech }]);
    }
  };

  const conversationStateListener = (conversationState) => {
    console.log('[conversationState] Current state:', conversationState);
    setConversationState(conversationState);
  };

  

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setSidebarContent('menu');
  };

  const sendForm = async () => {

    // navigate('/imelda');
    const payload = {
      yourCompany: company,
      yourRoleAndPriorities: role,
      aiCompany: aiCompany,
      aiRoleAndPriority: aiRole,
      successfulOutcome: outcome,
      manualMode:'True'
    };

    try {
      const response = await fetch('/api/manual_mode_view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        navigate('/imelda');
      } else {
        console.error('Form submission failed');
        
      }
    } catch (error) {
      console.error('Error:', error);

    }
  };

  const handleImelda = async () => {
    navigate('/imelda');
    fetch('/api/insert_Sue_conversation', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  };

  const handleSidebarNavigation = (content) => {
    setSidebarContent(content);
  };

  const renderSidebarContent = () => {
    switch (sidebarContent) {
      case 'profile':
        return (
          <div>
            <button className="back-button" onClick={() => handleSidebarNavigation('menu')}>
              <img src={Back} alt="Back"></img>
            </button>
            <h2>Load existing profile</h2>
            <p>Profile options come here</p>
          </div>
        );
      case 'edit':
        return (
          <div>
      <button className="back-button" onClick={() => handleSidebarNavigation('menu')}>
        <img src={Back} alt="Back" />
      </button>
      <h2>Enter manual mode</h2>
      <p>Your company</p>
      <textarea className="input-box" value={company} onChange={(e) => {
        setCompany(e.target.value)}
      }></textarea>
      <p>Your role and priorities</p>
      <textarea className="input-box" value={role} onChange={(e) => setRole(e.target.value)}></textarea>
      <p>AI company</p>
      <textarea className="input-box" value={aiCompany} onChange={(e) => setAiCompany(e.target.value)}></textarea>
      <p>AI role and priority</p>
      <textarea className="input-box" value={aiRole} onChange={(e) => setAiRole(e.target.value)}></textarea>
      <p>Successful outcome</p>
      <textarea className="input-box" value={outcome} onChange={(e) => setOutcome(e.target.value)}></textarea>
      <br />
      <br />
      <button onClick={sendForm}>
        <img src={Play} alt="Play" height="50px" width="50px" />
        <span className="tooltip">Play</span>
      </button>
    </div>
        );
      case 'frequency':
        return (
          <div>
            <button className="back-button" onClick={() => handleSidebarNavigation('menu')}>
              <img src={Back} alt="Back"></img>
            </button>
            <h2>Frequency</h2>
            <p>Frequency of interrupt...</p>
          </div>
        );
      case 'dashboard':
        return (
          <div>
            <button className="back-button" onClick={() => handleSidebarNavigation('menu')}>
              <img src={Back} alt="Back"></img>
            </button>
            <h2>Dashboard</h2>
            <p>Dashboard content goes here...</p>
          </div>
        );
      case 'upload':
        return (
          <div>
            <button className="back-button" onClick={() => handleSidebarNavigation('menu')}>
              <img src={Back} alt="Back"></img>
            </button>
            <h2>Upload Documents</h2>
            <div className="upload-box">
              <img src={Upload} alt="Upload"></img>
              <p>Click here to upload, or drag</p>
            </div>
          </div>
        );
      default:
        return (
          <ul>
            {/* <li><button onClick={() => handleSidebarNavigation('profile')}>Load existing profile</button></li> */}
            <li><button onClick={() => handleSidebarNavigation('edit')}>Edit questions manually</button></li>
            {/* <li><button onClick={() => handleSidebarNavigation('frequency')}>Frequency of interrupt</button></li> */}
            {/* <li><button onClick={() => handleSidebarNavigation('dashboard')}>Dashboard</button></li> */}
            {/* <li><button onClick={() => handleSidebarNavigation('upload')}>Upload documents</button></li> */}
          </ul>
        );
    }
  };

  

  const toggleTranscript = () => {
    setShowTranscript((prevShowTranscript) => !prevShowTranscript);
  };

  const toggleMic = () => {
    setIsMuted(prevState => !prevState);
    if (sceneRef.current) {
      const active = sceneRef.current.isMicrophoneActive();
      // if not active, stop persona from talking and start listening.
      if(!active){
        const stopSpeaking = personaRef.current.stopSpeaking();
      }
      sceneRef.current.setMediaDeviceActive({
        microphone: !active,
      });
      console.log(`Microphone ${!active ? 'unmuted' : 'muted'}`);
    } else {
      console.error('Scene is not initialized');
    }
  };

  const toggleSpeaker = () => {
    setSoundOff(prevState => !prevState);
    const videoEl = document.getElementById('sm-video');
    if (videoEl) {
      videoEl.muted = !isSoundOff;
      console.log(`Speaker ${!isSoundOff ? 'muted' : 'unmuted'}`);
    }
  };

  const handlePushToTalk = (event) => {
    // Add 'input-box ingore-push-talk' class where you don't want space bar to catch here
    if(event.code === 'Space' && !(/input-box/.test(event.target.className))){
      if(pushKeyStateRef.current != event.type){
        pushKeyStateRef.current = event.type;
        event.preventDefault();
        event.stopPropagation();
        toggleMic();

        // If spacebar click mutes the video, unmute it 
        const videoEl = document.getElementById('sm-video');
        if (videoEl && videoEl.muted && !isSoundOff)
          videoEl.muted = isSoundOff

      }
    }
  };

  

  const handleSettings = () => {
    navigate('/settings');
  };

  const logout = () => {
    const token = localStorage.getItem('jwtToken');
    const refreshToken = localStorage.getItem('refresh_token');

    fetch('/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    })
    .then(response => {
      if (response.status === 205) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => console.error('Error:', error));
  }

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/summarize?username=${profile.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setLoading(false);
      navigate('/summarize', { state: { summary: data } });
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const getConversationStateText = (state) => {
    switch (state) {
      case 'userSpeaking':
        return 'Listening...';
      case 'dpProcessing':
        return 'Thinking...';
      case 'dpSpeaking':
        return 'Speaking...';
      case 'idle':
        return 'Idle...';
      default:
        return '';
    }
  };

  return (
    <>{isVideoLoading && <Loader />}
    <div className="soul-machine-container">
      <video id="sm-video" autoPlay muted={isSoundOff}></video>
      <div className="overlay-buttons-right">
        <button className="ingore-push-talk overlay-button" onClick={toggleTranscript}>
          <img src={cc} alt="CC" />
          <span className="tooltip">Closed Captions</span>
        </button>

        <button className="overlay-button" onClick={handleSettings}>
          <img src={settings} alt="Setup" />
          <span className="tooltip">Setup</span>
        </button>

        <button className="overlay-button" onClick={handleSummarize}>
          <img src={summary} alt="Summary" />
          <span className="tooltip">Summary</span>
        </button>

        <button className="overlay-button" onClick={toggleSidebar}>
          <img src={Menu} alt="Menu" />
          <span className="tooltip">Menu</span>
        </button>
        <button className="overlay-button" onClick={handleImelda}>
          <img src={Play} alt="Play" />
          <span className="tooltip">Play</span>
        </button>
      </div>

      <div className="overlay-buttons-top-right">
        <button className="overlay-button" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="overlay-buttons-left">
        <button className="overlay-button" onClick={toggleMic}>
          <img src={isMuted ? MicSlashed : Mic } alt="Mic" />
          <span className="tooltip">Mic</span>
        </button>

        <span className="audio-wave-container">
          <img width="150px" height="40px" src={AudioWave} alt="Wave" />
          {conversationState && (
            <div className="thought-bubble">
              {getConversationStateText(conversationState)}
            </div>
          )}
        </span>

        <button className="overlay-button" onClick={toggleSpeaker}>
          <img src={isSoundOff ? SpeakerSlashed : Speaker} alt="Speaker" />
          <span className="tooltip">Speaker</span>
        </button>
      </div>
      
      {showTranscript && (
        <div className="transcript-container">
          {transcript.map((entry, index) => (
            <div key={index} className={`transcript-entry ${entry.source}`}>
              {entry.text}
            </div>
          ))}
        </div>
      )}

      {showSidebar && (
        <div className="sidebar">
          <div className="sidebar-header">
            <button className="close-sidebar" onClick={toggleSidebar}>X</button>
          </div>
          {renderSidebarContent()}
        </div>
      )}
      
      {connectionFailed && (
        <div className="bottom-buttons">
          <button id="connect-button" onClick={connect}>Connect</button>
        </div>
      )}
    </div>
    </>
  );
};

export default SoulMachineComponent;




