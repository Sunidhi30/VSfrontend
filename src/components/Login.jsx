
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Logo from "../assets/final.png";
// import LogoAlt from "../assets/profile.png"; // Add the path to your alternate image

// // Array of background images
// const bgImages = [
//   'url("https://akm-img-a-in.tosshub.com/businesstoday/images/story/202404/662234fb9c620-lok-sabha-election-2024-phase-1-voting-live-latest-news-191751221-16x9.jpg")', 
//   'url("https://tvnz-trial.shorthandstories.com/india-explainer/assets/Uo8XsVad9c/india-election-titlepage-6-280524-2560x1440.jpg")',
//   'url("https://www.indianyouth.net/wp-content/uploads/2017/07/whyyouthshoulvote.jpg")'
// ];

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [animate, setAnimate] = useState(false); 
//   const [bgImageIndex, setBgImageIndex] = useState(0); // Track which image is currently displayed
//   const [flip, setFlip] = useState(false); // State for flip animation
//   const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
//   const [voterId, setVoterId] = useState(""); // State for storing voter ID
//   const [errorMessage, setErrorMessage] = useState(""); // State for error messages

//   const [showPopup, setShowPopup] = useState(false);  // State to control popup visibility

//   const navigate = useNavigate();

//   // Function to change the background image
//   console.log(showPopup);
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
//     }, 5000); // Change every 5 seconds

//     return () => clearInterval(intervalId); // Clean up on component unmount
//   }, []);

//   // Function to handle flipping image
//   useEffect(() => {
//     const flipIntervalId = setInterval(() => {
//       setFlip((prev) => !prev); // Toggle the flip state every 5 seconds
//     }, 5000); // Change image every 5 seconds

//     return () => clearInterval(flipIntervalId); // Clean up on component unmount
//   }, []);

//   async function loginHandler(e) {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:4444/login", {
//         username: username,
//         password: password,
//       });

//       localStorage.setItem("token", response.data.token);
//       const voterId = response.data.voterId; // Fetch the voter ID from the response
//       setVoterId(voterId); // Set voter ID to state
          

//       // setShowPopup(true);  // Show the success popup
//       setShowPopup((prevstate)=> !prevstate);


//       // Delay navigation by 5 seconds to show the popup
//       setTimeout(() => {
//         setShowPopup(false);
//         navigate("/login");
//       }, 5000); // 5 seconds delay

//       if (response.data.role === "admin") { // Assuming the role is being returned
//         navigate("/admin");
//       } else {
//         navigate("/vote");
//       }

//       setUsername("");
//       setPassword("");
//       setAnimate(true);
//       setErrorMessage(""); // Clear the error message on successful login
//     } catch (error) {
//       if (error.response) {
//         window.alert(error.response.data.message || "An error occurred. Please try again.");
//       } else {
//         console.error("An error occurred:", error);
//         window.alert("An unexpected error occurred. Please try again later.");
//       }
//     }
//   }

  
//   return (
//     <div 
//       className={`relative flex h-screen items-center justify-center bg-cover bg-center transition-all duration-1000 ${animate ? "animate-bg" : ""}`}
//       style={{ backgroundImage: bgImages[bgImageIndex] }}
//     >
//       <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for opacity effect */}
      
//       <style>
//         {`
//           @keyframes animateBackground {
//             0% { background-color: #fef6e4; }
//             50% { background-color: #f3d2b3; }
//             100% { background-color: #fef6e4; }
//           }

//           .animate-bg {
//             animation: animateBackground 5s ease-in-out infinite;
//           }

//           .glowing-form {
//             background-color: rgba(255, 255, 255, 0.9); /* Off-white with slight transparency */
//             box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
//           }

//           .flip-container {
//             perspective: 1000px;
//             width: 100px; /* Standard logo width */
//             height: 100px; /* Standard logo height */
//             margin: 0 auto; /* Center the logo */
//           }

//           .flip-card {
//             width: 100%;
//             height: 100%;
//             position: relative;
//             transform-style: preserve-3d;
//             transition: transform 1s;
//             transform: ${flip ? "rotateY(180deg)" : "rotateY(0deg)"};
//           }

//           .flip-card img {
//             width: 100%;
//             height: 100%;
//             backface-visibility: hidden;
//             position: absolute;
//             object-fit: contain; /* Ensure the image fits within the container */
//           }

//           .flip-card .front {
//             z-index: 2;
//           }

//           .flip-card .back {
//             transform: rotateY(180deg);
//           }
//         `}
//       </style>
      
//       <div className="max-w-md w-full p-8 rounded-lg shadow-lg relative z-10 glowing-form">
//         <div className="flex flex-col items-center mb-6">
//           <div className="flip-container">
//             <div className="flip-card">
//               <img className="front" src={Logo} alt="Voting System" />
//               <img className="back" src={LogoAlt} alt="Alternate Voting System" />
//             </div>
//           </div>
//           <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800 mt-4">User Login</h2>
//         </div>
//         <p className="text-center text-sm text-gray-600 mt-2">Enter your details to sign in</p>

//         <form className="mt-8 space-y-6" onSubmit={loginHandler}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               onChange={(e) => setUsername(e.target.value)}
//               value={username}
//               required
//               className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
//               placeholder="Enter Aadhar Number"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Passcode</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               required
//               className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter Password"
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-semibold"
//             >
//               Sign In
//             </button>
//           </div>
//         </form>

//         <p className="mt-8 text-center text-sm text-gray-600">
//           Having trouble signing in? 
//           <Link to="#" className="text-blue-500 font-semibold"> Get help</Link>
//         </p>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Or sign in with 
//         </p>
        
//         <div className="mt-4 flex justify-center space-x-4">
//           <button
//               type="submit"
//               className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-semibold"
//             >
//               Google
//             </button>
//         </div>
        
//         <p className="mt-10 text-center text-sm text-gray-500">
//           Don't have an account? 
//           <Link to="/signup" className="text-blue-500 font-semibold"> Register Now</Link>
//         </p>
//       </div>

//       {showPopup && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Success!</h2>
//             <p>You have been successlly logged in. abh gand marvao</p>
//           </div>
//           </div>
//         )}
//     </div>
//     //728898987899
//   );
// };

// export default Login;


import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/final.png";
import LogoAlt from "../assets/profile.png"; // Add the path to your alternate image

// Array of background images
const bgImages = [
  'url("https://akm-img-a-in.tosshub.com/businesstoday/images/story/202404/662234fb9c620-lok-sabha-election-2024-phase-1-voting-live-latest-news-191751221-16x9.jpg")', 
  'url("https://tvnz-trial.shorthandstories.com/india-explainer/assets/Uo8XsVad9c/india-election-titlepage-6-280524-2560x1440.jpg")',
  'url("https://www.indianyouth.net/wp-content/uploads/2017/07/whyyouthshoulvote.jpg")'
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false); 
  const [bgImageIndex, setBgImageIndex] = useState(0); // Track which image is currently displayed
  const [flip, setFlip] = useState(false); // State for flip animation
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [voterId, setVoterId] = useState(""); // State for storing voter ID
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  let userRole = useRef();
  const [showPopup, setShowPopup] = useState(false);  // State to control popup visibility

  const navigate = useNavigate();

  // Function to change the background image
  console.log(showPopup);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  // Function to handle flipping image
  useEffect(() => {
    const flipIntervalId = setInterval(() => {
      setFlip((prev) => !prev); // Toggle the flip state every 5 seconds
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(flipIntervalId); // Clean up on component unmount
  }, []);

  async function loginHandler(e) {
    e.preventDefault();
     console.log(username)
  console.log(password)
    try {
      const response = await axios.post("http://localhost:4444/login", {
        username: username,
        password: password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      // const voterId = response.data.voterId; // Fetch the voter ID from the response
      // setVoterId(voterId); // Set voter ID to state

      // // Show the popup after a successful login
      setShowPopup(true);

      // Delay navigation by 5 seconds to show the popup
      console.log(response.data)
      userRole.value= response.data;
      // console.log(userRole.value)

      // if(userRole ==='admin'){
      //   navigate("/admin");
      // }
      // else{
      //   navigate("/vote");
      // }
      setTimeout(() => {
        setShowPopup(false);
        // console.log(response.data.trim());
        // Navigate based on the user role after the popup is hidden
        // console.log(userRole.value);
        if (userRole.value === "admin") {
          navigate("/admin");
        } else {
          navigate("/vote");
        }
      }, 3000);  // 5 seconds delay for popup

      // Reset the form and error states
      setUsername("");
      setPassword("");
      setAnimate(true);
      setErrorMessage(""); // Clear the error message on successful login
    } catch (error) {
      if (error.response) {
        window.alert(error.response.data.message || "An error occurred. Please try again.");
      } else {
        console.error("An error occurred:", error);
        window.alert("An unexpected error occurred. Please try again later.");
      }
    }
  }

  
  return (
    <div 
      className={`relative flex h-screen items-center justify-center bg-cover bg-center transition-all duration-1000 ${animate ? "animate-bg" : ""}`}
      style={{ backgroundImage: bgImages[bgImageIndex] }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for opacity effect */}
      
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
            background-color: rgba(255, 255, 255, 0.9); /* Off-white with slight transparency */
            box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
          }

          .flip-container {
            perspective: 1000px;
            width: 100px; /* Standard logo width */
            height: 100px; /* Standard logo height */
            margin: 0 auto; /* Center the logo */
          }

          .flip-card {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 1s;
            transform: ${flip ? "rotateY(180deg)" : "rotateY(0deg)"};
          }

          .flip-card img {
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            position: absolute;
            object-fit: contain; /* Ensure the image fits within the container */
          }

          .flip-card .front {
            z-index: 2;
          }

          .flip-card .back {
            transform: rotateY(180deg);
          }
        `}
      </style>
      
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg relative z-10 glowing-form">
        <div className="flex flex-col items-center mb-6">
          <div className="flip-container">
            <div className="flip-card">
              <img className="front" src={Logo} alt="Voting System" />
              <img className="back" src={LogoAlt} alt="Alternate Voting System" />
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800 mt-4">User Login</h2>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">Enter your details to sign in</p>

        <form className="mt-8 space-y-6" onSubmit={loginHandler}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              placeholder="Enter Aadhar Number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Passcode</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter Password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-semibold"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Dont remember the password?
          <Link to="/forgot-password" className="text-blue-500 font-semibold"> Forget Password?</Link>
        </p>

       {/* <p className="mt-4 text-center text-sm text-gray-600">
         Or  
       </p>  */}
         
        {/* <div className="mt-4 flex justify-center space-x-4">
          <button
              type="submit"
              className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-semibold"
            >
              Google
            </button>
        </div>
         */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account? 
          <Link to="/signup" className="text-blue-500 font-semibold"> Register Now</Link>
        </p>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Login Successful!</h2>
            <p>Welcome! You will be redirected shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;


