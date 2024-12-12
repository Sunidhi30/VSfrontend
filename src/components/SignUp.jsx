

// import axios from 'axios';

// import emailjs from 'emailjs-com'; // Import EmailJS
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Logo from "../assets/final.png";
// import LogoAlt from "../assets/profile.png"; // Use the same alternate image as in Login

// // Array of background images
// const bgImages = [
//   'url("https://akm-img-a-in.tosshub.com/businesstoday/images/story/202404/662234fb9c620-lok-sabha-election-2024-phase-1-voting-live-latest-news-191751221-16x9.jpg")', 
//   'url("https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/12/19/Photos/Processed/Vote-k8vB--621x414@LiveMint.jpg")',
//   'url("https://tvnz-trial.shorthandstories.com/india-explainer/assets/Uo8XsVad9c/india-election-titlepage-6-280524-2560x1440.jpg")'
// ];

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [aadharNo, setAadharNo] = useState("");
//   const [password, setPassword] = useState("");
//   const [nationality, setNationality] = useState("");
//   const [errors, setErrors] = useState({});
//   const [animate, setAnimate] = useState(false);
//   const [bgImageIndex, setBgImageIndex] = useState(0);
//   const [showPopup, setShowPopup] = useState(false);  // State to control popup visibility
//   const [flip, setFlip] = useState(false);
//   const navigate = useNavigate();

//   const sendEmail = (email) => {
//     const templateParams = {
//       to_name: email,
//       message: "You have successfully registered for voting. Now you can successfully cast a vote."
//     };

//     emailjs.send('service_7aws48u', 'template_ko5sit4', templateParams, 'gGatg5smuh7GI6-Lh')
//       .then((response) => {
//         console.log('Email sent successfully!', response.status, response.text);
//         window.alert("Authentication email sent successfully.");
//       }, (err) => {
//         console.log('Failed to send email.', err);
//         window.alert("Failed to send email. Please try again.");
//       });
//   };

//   const validate = () => {
//     let errors = {};
//     const nameRegex = /^[A-Za-z\s]+$/;
//     const dobRegex = /^\d{4}\/\d{2}\/\d{2}$/;  // Updated to YYYY/MM/DD format

//     if (!nameRegex.test(name)) {
//       errors.name = "Name should only contain letters.";
//     }

//     if (!dobRegex.test(dob)) {
//       errors.dob = "Date of birth must be in the format YYYY/MM/DD.";
//     }

//     if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
//       errors.phoneNumber = "Phone number must be 10 digits long.";
//     }

//     if (aadharNo.length !== 12 || isNaN(aadharNo)) {
//       errors.aadharNo = "Aadhaar number must be 12 digits long.";
//     }

//     if (nationality.toLowerCase() !== "indian") {
//       errors.nationality = "Nationality must be Indian.";
//     }

//     setErrors(errors);
//     return errors;
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     const flipIntervalId = setInterval(() => {
//       setFlip((prev) => !prev);
//     }, 5000);

//     return () => clearInterval(flipIntervalId);
//   }, []);

//   function calculateAge(dob) {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();

//     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   }

//   async function signUpHandler(e) {
//     e.preventDefault();

//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       return;
//     }

//     const userAge = calculateAge(dob);

//     if (userAge < 18) {
//       window.alert("You are not eligible to register. Age must be 18 or above.");
//       return;
//     }

//     try {
//       const result = await axios.post("http://localhost:4444/voter", {
//         name,
//         dob,
//         email,
//         phoneNumber,
//         aadharNo,
//         password,
//         nationality,
//       });

//       console.log(result);
//       sendEmail(email); // Call the sendEmail function here to send the confirmation email
//       setShowPopup(true);  // Show the success popup

//       // Delay navigation by 5 seconds to show the popup
//       setTimeout(() => {
//         setShowPopup(false);
//         navigate("/login");
//       }, 5000); // 5 seconds delay

//       // Reset form fields
//       setName("");
//       setDob("");
//       setEmail("");
//       setPhoneNumber("");
//       setAadharNo("");
//       setPassword("");
//       setNationality("");
//       setAnimate(true);
//     } catch (error) {
//       console.error("An error occurred:", error);
//       window.alert("Registration failed. Please try again.");
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
//             max-height: 90vh; /* Ensure form fits within the viewport */
//             overflow-y: auto; /* Allow scrolling if content exceeds max-height */
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
//           <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800 mt-4">New Voter Registration</h2>
//         </div>
//         <p className="text-center text-sm text-gray-600 mt-2">Enter your details to sign up</p>

//         <form className="mt-8 space-y-6" onSubmit={signUpHandler}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//               className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
//               placeholder="Enter your name"
//             />
//             {errors.name && <p className="text-red-500">{errors.name}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Date of Birth (YYYY/MM/DD)</label>
//             <input
//               id="dob"
//               name="dob"
//               type="text"
//               onChange={(e) => setDob(e.target.value)}
//               value={dob}
//               required
//               className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
//               placeholder="Enter your date of birth"
//             />
//             {errors.dob && <p className="text-red-500">{errors.dob}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               required
//               className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//             <input
//               id="phoneNumber"
//               name="phoneNumber"
//               type="text"
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               value={phoneNumber}
//               required
//               className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
//               placeholder="Enter your phone number"
//             />
//             {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
//             <input
//               id="aadharNo"
//               name="aadharNo"
//               type="text"
//               onChange={(e) => setAadharNo(e.target.value)}
//               value={aadharNo}
//               required
//               className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
//               placeholder="Enter your Aadhaar number"
//             />
//             {errors.aadharNo && <p className="text-red-500">{errors.aadharNo}</p>}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               required
//               className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Nationality</label>
//             <input
//               id="nationality"
//               name="nationality"
//               type="text"
//               onChange={(e) => setNationality(e.target.value)}
//               value={nationality}
//               required
//               className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
//               placeholder="Enter your nationality"
//             />
//             {errors.nationality && <p className="text-red-500">{errors.nationality}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login here</Link>
//         </p>
//       </div>

//       {showPopup && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Success!</h2>
//             <p>You have successfully registered. You will be redirected to the login page shortly.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignUp;


import axios from 'axios';
import emailjs from 'emailjs-com'; // Import EmailJS
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/final.png";
import LogoAlt from "../assets/profile.png"; // Use the same alternate image as in Login

// Array of background images
const bgImages = [
  'url("https://akm-img-a-in.tosshub.com/businesstoday/images/story/202404/662234fb9c620-lok-sabha-election-2024-phase-1-voting-live-latest-news-191751221-16x9.jpg")', 
  'url("https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/12/19/Photos/Processed/Vote-k8vB--621x414@LiveMint.jpg")',
  'url("https://tvnz-trial.shorthandstories.com/india-explainer/assets/Uo8XsVad9c/india-election-titlepage-6-280524-2560x1440.jpg")'
];

const SignUp = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [password, setPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [errors, setErrors] = useState({});
  const [animate, setAnimate] = useState(false);
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);  // State to control popup visibility
  const [flip, setFlip] = useState(false);
  const navigate = useNavigate();

  const sendEmail = (email) => {
    console.log(email);
    
    const templateParams = {
      to_name: name,

      to_email: email, // Use the user's email
      
      message: "You have successfully registered for voting. Now you can successfully cast a vote."
    };

    emailjs.send('service_7aws48u', 'template_ko5sit4', templateParams, 'gGatg5smuh7GI6-Lh')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        window.alert("Authentication email sent successfully.");
      }, (err) => {
        console.log('Failed to send email.', err);
        window.alert("Failed to send email. Please try again.");
      });
  };

  const validate = () => {
    let errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const dobRegex = /^\d{4}\/\d{2}\/\d{2}$/;  // Updated to YYYY/MM/DD format

    if (!nameRegex.test(name)) {
      errors.name = "Name should only contain letters.";
    }

    if (!dobRegex.test(dob)) {
      errors.dob = "Date of birth must be in the format YYYY/MM/DD.";
    }

    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits long.";
    }

    if (aadharNo.length !== 12 || isNaN(aadharNo)) {
      errors.aadharNo = "Aadhaar number must be 12 digits long.";
    }

    if (nationality.toLowerCase() !== "indian") {
      errors.nationality = "Nationality must be Indian.";
    }

    setErrors(errors);
    return errors;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const flipIntervalId = setInterval(() => {
      setFlip((prev) => !prev);
    }, 5000);

    return () => clearInterval(flipIntervalId);
  }, []);

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  async function signUpHandler(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const userAge = calculateAge(dob);

    if (userAge < 18) {
      window.alert("You are not eligible to register. Age must be 18 or above.");
      return;
    }

    try {
      const result = await axios.post("http://localhost:4444/voter", {
        name,
        dob,
        email,
        phoneNumber,
        aadharNo,
        password,
        nationality,
      });

      console.log(result);
      sendEmail(email); // Call the sendEmail function here to send the confirmation email
      setShowPopup(true);  // Show the success popup

      // Delay navigation by 5 seconds to show the popup
      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 5000); // 5 seconds delay

      // Reset form fields
      setName("");
      setDob("");
      setEmail("");
      setPhoneNumber("");
      setAadharNo("");
      setPassword("");
      setNationality("");
      setAnimate(true);
    } catch (error) {
      console.error("An error occurred:", error);
      window.alert("Registration failed. Please try again.");
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
            max-height: 90vh; /* Ensure form fits within the viewport */
            overflow-y: auto; /* Allow scrolling if content exceeds max-height */
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
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-800 mt-4">New Voter Registration</h2>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">Enter your details to sign up</p>

        <form className="mt-8 space-y-6" onSubmit={signUpHandler}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              id="dob"
              name="dob"
              type="text"
              onChange={(e) => setDob(e.target.value)}
              value={dob}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
              placeholder="YYYY/MM/DD"
            />
            {errors.dob && <p className="text-red-600">{errors.dob}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
            <input
              id="aadharNo"
              name="aadharNo"
              type="text"
              onChange={(e) => setAadharNo(e.target.value)}
              value={aadharNo}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your Aadhaar number"
            />
            {errors.aadharNo && <p className="text-red-600">{errors.aadharNo}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nationality</label>
            <input
              id="nationality"
              name="nationality"
              type="text"
              onChange={(e) => setNationality(e.target.value)}
              value={nationality}
              required
              className="block w-full p-2 py-1.5 border rounded-md text-gray-900 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your nationality"
            />
            {errors.nationality && <p className="text-red-600">{errors.nationality}</p>}
          </div>

          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6">
        <p className="text-sm text-gray-600 text-center mt-4">
    Already have an account? <Link to="/login" className="text-blue-600">Log in</Link>
</p>
        </div>

        {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p>You have successfully registered. You will be redirected to the login page shortly.</p>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
