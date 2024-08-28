// src/components/SummaryView.js
import React from 'react';
import './Summarize.css';
import { useLocation } from 'react-router-dom';
import Sue from '../assets/sue.png';
import { useNavigate } from 'react-router-dom';

const SummaryView = () => {
  const location = useLocation();
  const summaryData = location.state?.summary;
  const navigate = useNavigate();

  const handleImelda = () => {
    navigate('/imelda');
  };

  return (
    <div className="Summary">
      <div className="left-side">
        <img src={Sue} alt="Sue Avatar" className="cover-image" />
      </div>
      <div className="chat-window">
        <div className="chat-header"></div>
        <div className="chat-body">
          <h1>Summary Table</h1>
          <br></br>
          <br></br>
          {summaryData ? (
          <div>
            {Object.entries(summaryData).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        ) : (
          <p>No summary available.</p>
        )}
      </div>
      <div className="chat-footer">
          <button>Edit</button>
          <button>Attach documents</button>
          <button onClick={handleImelda}>Start</button>
        </div>
      </div>
      </div>
  );
};

export default SummaryView;
