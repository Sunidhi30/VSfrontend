// import axios from 'axios'; // Import axios
// import JSConfetti from 'js-confetti';
// import React, { useEffect, useState } from 'react'; // Ensure useState is imported
// import { RiLogoutCircleRLine } from "react-icons/ri";
// import { Link } from 'react-router-dom';
// import './style.css'; // Import the CSS for transitions

// const Voted = () => {
//   const [voter, setVoter] = useState({});
//   const [storedToken, setToken] = useState("");
//   const [dob, setDob] = useState("");
  

//   useEffect(() => {
//     // Confetti effect on component mount
//     const jsConfetti = new JSConfetti();
//     jsConfetti.addConfetti({
//       confettiColors: ['#ff0a0a', '#0a0aff', '#0aff0a', '#ffaa0a'],
//       confettiRadius: 6,
//       confettiNumber: 200,
//     });

//     // Retrieve token from localStorage
//     const token = localStorage.getItem('token');
//     if (token) {
//       setToken(token);
//     }

//     // Fetch voter details
//     async function getVoter() {
//       try {
//         let response = await axios.get("http://localhost:4444/voting/voterDetails", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setDob(response.data.dob);
//         setVoter(response.data);
//       } catch (error) {
//         console.error('Error fetching voter details:', error);
//       }
//     }
//     getVoter();

//   }, []); // Correct useEffect with an empty dependency array to run only once

//   return (
//     // <div className='bg-blue-200 bg-opacity-25 min-h-screen relative'>
//     <div 
//     style={{
//       // backgroundImage: 'url(https://tvnz-trial.shorthandstories.com/india-explainer/assets/Uo8XsVad9c/india-election-titlepage-6-280524-2560x1440.jpg)', // Update the path to your image
//       backgroundSize: 'cover',
//       opacity: '6',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//     }} 
//     className='min-h-screen relative'
//   >
//       {/* Logout Button in Top Right Corner */}
//       <button 
//         className='absolute top-4 right-4 flex items-center px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full h-7'
//         onClick={() => {
//           localStorage.setItem("token", ""); // Clear token instead of setting space
//         }}
//       >
//         <div className="text-center">
//           <h2 className="text-xl font-semibold text-gray-900">{voter.name}</h2>
//           <p className="text-gray-600">Phone: {voter.phonenumber}</p>
//           <p className="text-gray-600">Aadhar: {voter.aadharno}</p>
//           <p className="text-gray-600">DOB: {dob.slice(0, 10)}</p>
//           <p className="text-gray-600">Nationality: {voter.nationality}</p>
//           <p className={`text-lg font-semibold ${voter.isvoted ? 'text-green-600' : 'text-red-600'}`}>
//             {voter.isvoted ? 'Voted' : 'Not Voted'}
//           </p>
//         </div>
//         <div>
//           <RiLogoutCircleRLine size={"18px"} />
//         </div>
//         <h1 className='font-bold text-lg ml-2'>
//           <Link to="/" >Logout</Link>
//         </h1>
//       </button>

//       {/* Main Content */}
//       <div className='flex justify-center items-center flex-col min-h-screen'>
//         <h1 className='font-bold text-5xl text-blue-600 mt-32 zoom-animation popper-animation'>
//           You have Successfully Voted!
//         </h1>
//       </div>
//     </div>
//   );
// }

// export default Voted;


import axios from 'axios'; // Import axios
import JSConfetti from 'js-confetti';
import React, { useEffect, useState } from 'react'; // Ensure useState is imported
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import './voted.css'; // Import the CSS for transitions

const Voted = () => {
  const [voter, setVoter] = useState({});
  const [storedToken, setToken] = useState("");
  const [dob, setDob] = useState("");
  
  useEffect(() => {
    // Confetti effect on component mount
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiColors: ['#ff0a0a', '#0a0aff', '#0aff0a', '#ffaa0a'],
      confettiRadius: 6,
      confettiNumber: 200,
    });

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }

    // Fetch voter details
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

  }, []); // Correct useEffect with an empty dependency array to run only once

  return (
    <div className="containery">
      <img src="https://t3.ftcdn.net/jpg/02/35/27/84/360_F_235278426_qkGdsSME9vIYJqEBVlV0tvc8sCWnr9UX.jpg" 
    alt="Background Image" 
    className="w-full h-auto object-cover" 
  />
      {/* Card Layout */}
      <div className="card">
        {/* Top Right Logout Button */}
        <button 
          className="logout-button"
          onClick={() => {
            localStorage.setItem("token", ""); // Clear token
          }}
        >
          <RiLogoutCircleRLine size={"18px"} />
          <h1 className="logout-text">
            <Link to="/" >Logout</Link>
          </h1>
        </button>

        {/* User Voter Details */}
        <div className="voter-details">
          <h2 className="user-name">{voter.name}</h2>
          <p className="user-info">Phone: {voter.phonenumber}</p>
          <p className="user-info">Aadhar: {voter.aadharno}</p>
          <p className="user-info">DOB: {dob.slice(0, 10)}</p>
          <p className="user-info">Nationality: {voter.nationality}</p>
          <p className={`voting-status ${voter.isvoted ? 'voted' : 'not-voted'}`}>
            {voter.isvoted ? 'Voted' : 'Not Voted'}
          </p>
        </div>
        
        {/* Main Message */}
        <div className="main-message">
          <h1 className="message">You have Successfully Voted!</h1>
        </div>
      </div>
    </div>
  );
}

export default Voted;
