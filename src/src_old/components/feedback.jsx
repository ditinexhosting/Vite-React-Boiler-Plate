import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './Feedback.css';
import Imelda from '../assets/imelda.png';

const FeedbackView = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    
    const socket = new WebSocket('wss://www.clientconversation.coach/ws/feedback/?access_token=test');

    //const socket = new WebSocket('wss://echo.websocket.org');
    
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    
    socket.onmessage = (event) => {
      //Parse the incoming message as JSON
      const data = JSON.parse(event.data);
      console.log(data)
      // Append the new chunk to the existing feedback
      setFeedback(prevFeedback => prevFeedback + data.message);
    };

    // Cleanup the WebSocket connection when the component is unmounted
    return () => {
      socket.close();
    };
  }, []);

  const handleRedo = () => {
    navigate('/imelda');
    //  TODO: Delete imelda thread_id
  };

  const handleRestart = () => {
    navigate('/sue');
    // TODO: Delete Sue thread_id, Imelda assistant_id, and Imelda thread_id
  };

  return (
    <div className="Feedback">
      <div className="left-side">
        <img src={Imelda} alt="Imelda Avatar" className="cover-image" />
      </div>
      <div className="chat-window">
        <div className="chat-header"></div>
        <div className="chat-body">
          <h1>Feedback</h1>
          <div className="feedback-content">
            {feedback ? <ReactMarkdown>{feedback}</ReactMarkdown> : <p>No feedback available yet.</p>}
          </div>
        </div>
        <div className="chat-footer">
          <button onClick={handleRedo}>Redo</button>
          <button onClick={handleRestart}>Restart</button>
          <button>Continue</button>
          <button>Conclude</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackView;