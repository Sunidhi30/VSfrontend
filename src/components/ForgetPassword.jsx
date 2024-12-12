// import axios from 'axios';
// import emailjs from 'emailjs-com';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ForgetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Send request to backend to verify email and get token
//       const response = await axios.post('http://localhost:4444/forgot-password', { email });
//       console.log(response);
//       const resetToken = response.data.token;

//       // Send email using EmailJS with the reset link
//       const templateParams = {
//         to_email: email,
//         message : ` Please click this link to get my heart : http://localhost:5173/reset-password/${resetToken}`, // Your frontend reset password route
//       };
     
//       await emailjs.send('service_7aws48u', 'template_ko5sit4', templateParams, 'gGatg5smuh7GI6-Lh')


//       alert('Password reset email sent! Check your inbox.');
//       navigate('/login'); // Redirect to login page after success
//     } catch (err) {
//       setError('Failed to send reset email. Make sure the email is correct.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="forget-password-container">
//       <h2>Forget Password</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">Enter your email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           required
//         />
//         {error && <p className="error">{error}</p>}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Sending...' : 'Send Reset Email'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgetPassword;
import axios from 'axios';
import emailjs from 'emailjs-com';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/image.png";
// Array of background images (same as in the Login component)
const bgImages = [
  'url("https://akm-img-a-in.tosshub.com/businesstoday/images/story/202404/662234fb9c620-lok-sabha-election-2024-phase-1-voting-live-latest-news-191751221-16x9.jpg")', 
  'url("https://tvnz-trial.shorthandstories.com/india-explainer/assets/Uo8XsVad9c/india-election-titlepage-6-280524-2560x1440.jpg")',
  'url("https://www.indianyouth.net/wp-content/uploads/2017/07/whyyouthshoulvote.jpg")'
];

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4444/forgot-password', { email });
      const resetToken = response.data.token;

      // Send reset email with EmailJS
      const templateParams = {
        to_email: email,
        message : `Click here to reset your password: http://localhost:5173/reset-password/${resetToken}`, // Reset password route
      };

      await emailjs.send('service_7aws48u', 'template_ko5sit4', templateParams, 'gGatg5smuh7GI6-Lh');

      alert('Password reset email sent! Check your inbox.');
      navigate('/login'); // Redirect to login page after success
    } catch (err) {
      setError('Failed to send reset email. Make sure the email is correct.');
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
      
      {/* <div className="max-w-md w-full p-8 rounded-lg shadow-lg glowing-form relative z-10"> */}
      {/* <div className="absolute top-10">
        <img 
          src={logo}
          alt="Logo" 
          className="h-16 mx-auto mb-6"
        />
      </div> */}
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg relative z-10 glowing-form">
        <div className="flex flex-col items-center mb-6">
          <div className="flip-container">
            <div className="flip-card">
              <img className="front" style={{width:"90px"}} src={Logo} alt="Voting System" />
              {/* <img className="back" src={LogoAlt} alt="Alternate Voting System" /> */}
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800 mt-4">Forget Password</h2>
        </div>

        {/* <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800">Forget Password</h2> */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter your email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-semibold"
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
