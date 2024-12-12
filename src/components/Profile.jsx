import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import './profile.css'; // Use your existing style

const Profile = () => {
  const [voter, setVoter] = useState({});
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch voter details from the server using the stored token
    const fetchVoterDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4444/voting/voterDetails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVoter(response.data);
        setDob(response.data.dob); // Assuming DOB is coming in a string format
      } catch (error) {
        setError('Failed to fetch voter details');
      }
    };

    fetchVoterDetails();
  }, []);

  const closeProfile = () => {
    navigate('/vote'); // Navigate back to the voting page
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <button className="close-button" onClick={closeProfile}>
          <AiOutlineCloseCircle size={28} color="red" />
        </button>

        {/* Display voter information */}
        {error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <h2 className="user-name">{voter.name}</h2>
            <p className="user-info">Phone: {voter.phonenumber}</p>
            <p className="user-info">Aadhar: {voter.aadharno}</p>
            <p className="user-info">DOB: {dob.slice(0, 10)}</p>
            <p className="user-info">Nationality: {voter.nationality}</p>
            <p className={`voting-status ${voter.isvoted ? 'voted' : 'not-voted'}`}>
              {voter.isvoted ? 'Voted' : 'Not Voted'}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
