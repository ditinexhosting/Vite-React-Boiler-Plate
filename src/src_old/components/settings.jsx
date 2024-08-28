import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import AuthService from '../services/auth.service';
import User from '../assets/user.png';

const Settings = () => {
  const [adminMode, setAdminMode] = useState('Admin Mode');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Sue');
  const [promptSelection, setPromptSelection] = useState('Self');
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [promptName, setPromptName] = useState('');
  const [sueContent, setSueContent] = useState({ instruction: '', description: '' });
  const [imeldaContent, setImeldaContent] = useState({ instruction: '', description: '' });
  const [mediatorContent, setMediatorContent] = useState({ instruction: '', description: '' });
  const [isEditable, setIsEditable] = useState(false);
  const [files, setFiles] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showApplyPopup, setShowApplyPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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

  const handleModeChange = (mode) => {
    setAdminMode(mode);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handlePromptChange = (event) => {
    const selectedValue = event.target.value;
    setPromptSelection(selectedValue);
    if (profile && profile.username) {
      fetchFiles(selectedValue, profile.username);
    }
  };

  const handlePromptClick = async (prompt) => {
    setSelectedPrompt(prompt);
    setIsEditable(false);
    setIsSaved(false);
    try {
      const response = await fetch(`/api/populate_prompt_content?username=${profile.username}&prompt=${prompt}`);
      const data = await response.json();
      if (response.ok) {
        setSueContent({ instruction: data.sue_instruction, description: data.sue_description });
        setImeldaContent({ instruction: data.imelda_instruction, description: data.imelda_description });
        setMediatorContent({ instruction: data.mediator_instruction, description: data.mediator_description });
      } else {
        console.error('Error fetching file content:', data.error);
      }
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };

  const fetchFiles = async (selectedValue, username) => {
    try {
      const response = await fetch(`/api/create_admin_prompt_cards?username=${username}&type=${selectedValue}`);
      const data = await response.json();
      setFiles(data.prompt_names);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    if (profile && profile.username) {
      fetchFiles(promptSelection, profile.username);
    }
  }, [promptSelection, profile]);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleSaveClick = () => {
    if (!promptName.trim()) {
      alert('Prompt name cannot be empty');
      return;
    }

    const payload = {
      sue_instruction: sueContent.instruction,
      sue_description: sueContent.description,
      imelda_instruction: imeldaContent.instruction,
      imelda_description: imeldaContent.description,
      mediator_instruction: mediatorContent.instruction,
      mediator_description: mediatorContent.description,
      prompt_name: promptName,
      username: profile.username,
      action: "new_prompt"
    };

    fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setIsSaved(true);
        setShowSavePopup(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleApplyClick = () => {
    if (!isSaved) {
      alert('Please save the changes before applying.');
      return;
    }
    alert('This is a user level change. Others cannot see this');
    const payload = {
      prompt_name: promptName,
      username: profile.username
    };

    fetch('/api/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Apply Success:', data);
        setShowApplyPopup(true);
      })
      .catch((error) => {
        console.error('Apply Error:', error);
      });
  };

  const handleApplyToAllClick = () => {
    if (!isSaved) {
      alert('Please save the changes before applying.');
      return;
    }
    alert('This is an organization level change, proceed with caution');
    
    const payload = {
      prompt_name: promptName,
      username: profile.username
    };
    console.log(payload)
    fetch('/api/apply_to_all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Apply Success:', data);
        setShowApplyPopup(true);
      })
      .catch((error) => {
        console.error('Apply Error:', error);
      });
  };

  const handleCloseSavePopup = () => {
    setShowSavePopup(false);
  };

  const handleStartExperience = () => {
    navigate('/sue');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="greeting-header">
        <div className="greeting">
          <span>Welcome {profile.username}!</span>
          <img src={User} className="user-photo" alt="User" />
        </div>
      </div>

      <div className="content">
        <div className="left-container">
          
          <label>Prompt Selection</label>
          
          <br />
          <select value={promptSelection} onChange={handlePromptChange}>
            <option value="Self">Self prompts</option>
            <option value="All">Global prompts</option>
          </select>
         
          <br />

          <div className="prompts">
            {files.map((file, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(file)}
                className={selectedPrompt === file ? 'selected' : ''}
              >
                {file}
              </button>
            ))}
          </div>
        </div>

        <div className="right-container">
          <div className="right-container-header">
            <div className="tab-buttons">
              <button onClick={() => handleTabChange('Sue')} className={selectedTab === 'Sue' ? 'active' : ''}>Sue</button>
              <button onClick={() => handleTabChange('Imelda')} className={selectedTab === 'Imelda' ? 'active' : ''}>Imelda</button>
              <button onClick={() => handleTabChange('Mediator')} className={selectedTab === 'Mediator' ? 'active' : ''}>Mediator</button>
            </div>
          </div>

          <div className="promptname">
            <input
              type="text"
              placeholder="Enter Prompt Name ... (without underscore) "
              value={promptName}
              onChange={(e) => {
                setPromptName(e.target.value);
                setIsSaved(false);
              }}
              required
            />
          </div>
          {/* 
          <div className="toggle-button-container">
            <label className="toggle-label">Save edit as new prompt</label>
            <div className="toggle-switch">
              <input type="checkbox" id="toggle" checked readOnly />
              <label htmlFor="toggle" className="toggle-slider"></label>
            </div>
          </div>
            */}
          <br></br>
          <textarea
            className="description-textarea"
            placeholder="Description ..."
            value={selectedTab === 'Sue' ? sueContent.description :
              selectedTab === 'Imelda' ? imeldaContent.description :
                mediatorContent.description}
            onChange={(e) => {
              const value = e.target.value;
              if (selectedTab === 'Sue') setSueContent(prev => ({ ...prev, description: value }));
              if (selectedTab === 'Imelda') setImeldaContent(prev => ({ ...prev, description: value }));
              if (selectedTab === 'Mediator') setMediatorContent(prev => ({ ...prev, description: value }));
              setIsSaved(false);
            }}
            readOnly={!isEditable}
          />
          <textarea
            className="instructions-textarea"
            placeholder="Instructions ..."
            value={selectedTab === 'Sue' ? sueContent.instruction :
              selectedTab === 'Imelda' ? imeldaContent.instruction :
                mediatorContent.instruction}
            onChange={(e) => {
              const value = e.target.value;
              if (selectedTab === 'Sue') setSueContent(prev => ({ ...prev, instruction: value }));
              if (selectedTab === 'Imelda') setImeldaContent(prev => ({ ...prev, instruction: value }));
              if (selectedTab === 'Mediator') setMediatorContent(prev => ({ ...prev, instruction: value }));
              setIsSaved(false);
            }}
            readOnly={!isEditable}
          />

          {/* <div className="response-length-container">
            <label>Response length</label>
            <input type="number" placeholder="50" step="100" />
          </div> */}

          <div className="buttons">
            <button onClick={handleEditClick}>{isEditable ? 'Lock' : 'Edit'}</button>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleApplyClick} disabled={!isSaved}>Apply</button>
            {/*<button onClick={handleExperienceClick} disabled={!isSaved}>Experience</button>  */}
            <button onClick={handleApplyToAllClick} disabled={!isSaved}>Apply to All</button>
          </div>
        </div>
      </div>

      {showSavePopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Changes Saved</h2>
            <p>Changes saved, click on apply for changes to reflect</p>
            <button onClick={handleCloseSavePopup}>Close</button>
          </div>
        </div>
      )}

      {showApplyPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Changes Applied</h2>
            <p>Changes applied successfully.</p>
            <button onClick={handleStartExperience}>Start Experience</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
