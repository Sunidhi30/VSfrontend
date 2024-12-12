import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const ProfileModal = ({ isOpen, onClose }) => {
  const [voter, setVoter] = useState({});
  const [dob, setDob] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchProfile = async () => {
        try {
          const storedToken = localStorage.getItem('token');

          if (storedToken) {
            const response = await axios.get('http://localhost:4444/voting/voterDetails', {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            });

            const profileData = response.data;
            setVoter(profileData);
            setDob(profileData.dob);  // Set DOB separately to manage date format
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchProfile();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <RiCloseLine size={24} />
        </button>
        <div className="flex justify-center mb-6">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src="https://th.bing.com/th/id/OIP.RGyf_0-ICbus3P2JUlQpKQHaHa?pid=ImgDet&w=186&h=186&c=7&dpr=1.4"
            alt="Profile"
          />
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
      </div>
    </div>
  );
};

export default ProfileModal;
