// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const ResetPassword = () => {
//   const { token } = useParams(); // Retrieve the token from the URL
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     setLoading(true);
//     setError('');

//     try {
//       // Send the new password along with the reset token to the backend
//       await axios.post('http://localhost:4444/forgot-password/reset-password', {
//         token,
//         password,
//       });

//       alert('Password reset successfully!');
//       navigate('/login'); // Redirect to login after successful reset
//     } catch (err) {
//       setError('Failed to reset password. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="reset-password-container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="password">New Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter new password"
//           required
//         />
//         <label htmlFor="confirmPassword">Confirm Password:</label>
//         <input
//           type="password"
//           id="confirmPassword"
//           name="confirmPassword"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm new password"
//           required
//         />
//         {error && <p className="error">{error}</p>}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Resetting...' : 'Reset Password'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from "../assets/image.png";
// Array of background images (same as in Login and Forget Password)
const bgImages = [
  'url("https://akm-img-a-in.tosshub.com/businesstoday/images/story/202404/662234fb9c620-lok-sabha-election-2024-phase-1-voting-live-latest-news-191751221-16x9.jpg")', 
  'url("https://tvnz-trial.shorthandstories.com/india-explainer/assets/Uo8XsVad9c/india-election-titlepage-6-280524-2560x1440.jpg")',
  'url("https://www.indianyouth.net/wp-content/uploads/2017/07/whyyouthshoulvote.jpg")'
];

const ResetPassword = () => {
  const { token } = useParams(); // Retrieve the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgImageIndex, setBgImageIndex] = useState(0); // Background image index
  const [animate, setAnimate] = useState(false); // Animation state
  const navigate = useNavigate();

  // Background image animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    try {
      // Send the new password along with the reset token to the backend
      await axios.post('http://localhost:4444/forgot-password/reset-password', {
        token,
        password,
      });

      alert('Password reset successfully!');
      navigate('/login'); // Redirect to login after successful reset
    } catch (err) {
      setError('Failed to reset password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`relative flex h-screen items-center justify-center bg-cover bg-center transition-all duration-1000 ${animate ? "animate-bg" : ""}`}
      style={{ backgroundImage: bgImages[bgImageIndex] }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Background overlay */}

      <style>
        {`
          @keyframes animateBackground {
            0% { background-color: #fef6e4; }
            50% { background-color: #f3d2b3; }
            100% { background-color: #fef6e4; }
          }

          .animate-bg {
            animation: animateBackground 5s ease-in-out infinite;
          }

          .glowing-form {
            background-color: rgba(255, 255, 255, 0.9); 
            box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
          }
        `}
      </style>

      <div className="max-w-md w-full p-8 rounded-lg shadow-lg relative z-10 glowing-form">
        <div className="flex flex-col items-center mb-6">
          <div className="flip-container">
            <div className="flip-card">
              <img className="front" style={{width:"90px"}} src={Logo} alt="Voting System" />
              {/* <img className="back" src={LogoAlt} alt="Alternate Voting System" /> */}
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800 mt-4">Reset Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              placeholder="Confirm new password"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-semibold"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
