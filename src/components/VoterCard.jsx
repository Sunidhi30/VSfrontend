import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const VoterCard = ({ setShowVoterCard }) => {
  const [voter, setVoter] = useState({});
  const [storedToken, setToken] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }

    async function getVoter() {
      try {
        let response = await axios.get("http://localhost:4444/voting/voterDetails", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDob(response.data.dob);
        setVoter(response.data);
      } catch (error) {
        console.error('Error fetching voter details:', error);
      }
    }
    getVoter();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setShowVoterCard(false); // Close VoterCard
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://media.istockphoto.com/id/464623500/photo/group-of-people-waving-indian-flags-in-back-lit.jpg?s=612x612&w=0&k=20&c=kpiw0XVr-Sjc0iaSKXVcXbP2otCdPaH0-N90avg2NIg=")' }} />
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-all duration-300 transform hover:scale-105 z-10">
        <button
          onClick={() => setShowVoterCard(false)} // Close VoterCard
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <RiLogoutCircleRLine size={"24px"} />
        </button>
        <div className="flex justify-center mb-6">
          <img className="w-24 h-24 rounded-full object-cover" src="https://th.bing.com/th/id/OIP.RGyf_0-ICbus3P2JUlQpKQHaHa?pid=ImgDet&w=186&h=186&c=7&dpr=1.4" alt="Profile" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">{voter.name}</h2>
          <p className="text-gray-600">Phone: {voter.phonenumber}</p>
          <p className="text-gray-600">Aadhar: {voter.aadharno}</p>
          <p className="text-gray-600">DOB: {dob.slice(0, 10)}</p>
          <p className="text-gray-600">Nationality: {voter.nationality}</p>
          <p className={`text-lg font-semibold ${voter.isvoted ? 'text-green-600' : 'text-red-600'}`}>
            {voter.isvoted ? 'Voted' : 'Not Voted'}
          </p>
        </div>
        <button
          className="mt-4 flex items-center justify-center mx-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-all duration-300"
          onClick={handleLogout} // Use the handleLogout function
        >
          <RiLogoutCircleRLine size={"18px"} />
          <span className="font-bold text-lg ml-2">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default VoterCard;
