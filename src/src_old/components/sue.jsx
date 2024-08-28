import React, { useState, useEffect, useRef } from 'react';
import './Sue.css';
// import Sue from '../assets/sue.png';
// import Settings from '../assets/settings.png';
import { useNavigate } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import { ClipLoader } from 'react-spinners';
import SoulMachineComponent from './sue_ddna';

const SueApp = () => {
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState('');
  // const chatBodyRef = useRef(null);
  // const socketRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {

  //   const jwtToken = localStorage.getItem('jwtToken');
  //   socketRef.current = new WebSocket('ws://127.0.0.1:8000/ws/chat/?token=' + jwtToken);

  //   socketRef.current.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log(data);

  //     if (data.sender === 'bot') {
  //       setMessages((prevMessages) => {
  //         const lastMessage = prevMessages[prevMessages.length - 1];
  //         if (lastMessage && lastMessage.sender === 'user') {
  //           return [...prevMessages, { text: `Sue: ${data.message}`, sender: 'bot' }];
  //         } else {
  //           const updatedMessages = [...prevMessages];
  //           const lastBotMessage = updatedMessages.pop();
  //           return [...updatedMessages, { text: lastBotMessage.text + data.message, sender: 'bot' }];
  //         }
  //       });
  //     } else {
  //       setMessages((prevMessages) => [...prevMessages, { text: `Sue: ${data.message}`, sender: 'bot' }]);
  //     }
  //   };

  //   return () => {
  //     socketRef.current.close();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (chatBodyRef.current) {
  //     chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  //   }
  // }, [messages]);

  const handleSettings = () => {
    navigate('/settings');
  };

  // const handleSend = () => {
  //   if (input.trim() !== '') {
  //     const userMessage = { message: input };
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: `User: ${input}`, sender: 'user' },
  //     ]);
  //     socketRef.current.send(JSON.stringify(userMessage));
  //     setInput('');
  //   }
  // };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ text: input }),
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


  return (
    <div className="SueApp full-screen">
      <SoulMachineComponent />


</div>
  );
};

export default SueApp;
