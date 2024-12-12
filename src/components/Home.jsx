

import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage1 from "../assets/head.avif"; // Single background image
import logo from '../assets/image.png';
import voteImage3 from "../assets/vote.webp"; // Third vote image
import voteImage1 from "../assets/vote1.png"; // First vote image
import voteImage2 from "../assets/vote2.png"; // Second vote image
import './container.css';
import './home.css';
import './style.css';

const Home = () => {
    const navigate = useNavigate();
    const [currentVoteImageIndex, setCurrentVoteImageIndex] = React.useState(0);
    const voteImages = [voteImage1, voteImage2, voteImage3]; // Array of vote images
    

    React.useEffect(() => {
        const voteImageIntervalId = setInterval(() => {
            setCurrentVoteImageIndex((prevIndex) =>
                prevIndex === voteImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change vote image every 3 seconds

        return () => clearInterval(voteImageIntervalId); // Cleanup interval on unmount
    }, [voteImages.length]);

    // Define the animation variants for the voting images
    const voteImageVariants = {
        fadeInOut: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        },
        fadeInScale: {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
        },
        twirl: {
            initial: { opacity: 0, rotate: 0 },
            animate: { opacity: 1, rotate: 360 },
            exit: { opacity: 0, rotate: 0 },
        },
    };

    return (
        <div className='m-0 p-0 h-[100]%'>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DoVote</span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Get started
                        </button>
                        <button
                            data-collapse-toggle="navbar-cta"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-cta"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#service"
                                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#footer"
                                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="background-image">
                <div className="bg-color"></div>
                <motion.img
                    src={bgImage1} // Display a single background image
                    alt="Background"
                    className="absolute inset-0 object-cover w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }} // Fade transition for images
                />
                <div className="overlay centered-text">
                    <h1 className="heading-transition">DoVote<span> Choose Today - Change Tomorrow</span></h1>
                    <p className="typing-effect">Cast your vote with ease and grace, securely online, from any place.</p>
                </div>
            </div>

            <div className="container" id="about">
                <div className="evote-section">
                    <h2>About DoVote</h2>
                    <div className="evote-content">
                        <div className="evote-image">
                            <img src={voteImages[currentVoteImageIndex]} alt="eVote Image" />
                        </div>
                        <div className="evote-text">
                            <p>
                                DoVote is an election system that facilitates voters to record their secure and secret ballot electronically. It has a friendly user interface and enables voters to cast their votes in a few simple steps. We ensure the authenticity of the voters and the votes cast by them along with the non-traceability of the casted vote. DoVote's robust architecture has persistently manifested to be one of the most reliable, comprehensible, and economical electronic voting solutions.
                            </p>
                            <br />
                            <p>
                                It renders a simple and accessible voter experience that eventually increases voter engagement and turnout. Auditable, easy to use, secure, and reliable is what sets DoVote apart from its competitors.
                            </p>
                            <br />
                            <p>
                                DoVote has facilitated several organizations, across a wide range of industries, to conduct hassle-free electronic voting with utmost security and integrity. Some of our fortes include outstanding and prompt customer support, highly secure and trustworthy elections, and last but not least; our potential to be able to tabulate expeditious and accurate results.
                            </p>
                            <br />
                            <p>
                                We’d welcome the opportunity to work with you to provide exceptional and unparalleled service and add you to our ever-growing list of satisfied clients.
                            </p>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />

            <div className="how-it-works-section" id="service">
                <h1 className="section-heading">How it works?</h1>
                <h3 className="section-subheading">Conducting an online election on DoVote is a simple 3-step process.</h3>
                <div className="steps-container">
                    <div className="step" id="step-1">
                        <div className="step-circle">1</div>
                        <h3 className="step-heading">Set-up Election</h3>
                        <p className="step-text">On successful registration, you can set up an election with our effortless ballot setup. This process involves 3 steps: Add Election Details, Add Voter List, Review & Launch.</p>
                    </div>
                    <div className="step" id="step-2">
                        <div className="step-circle">2</div>
                        <h3 className="step-heading">Vote</h3>
                        <p className="step-text">Voters receive a unique link via email to cast their votes securely. With our intuitive interface, they can complete their voting in minutes.</p>
                    </div>
                    <div className="step" id="step-3">
                        <div className="step-circle">3</div>
                        <h3 className="step-heading">Results</h3>
                        <p className="step-text">Election results are tabulated and displayed promptly, ensuring transparency and integrity.</p>
                    </div>
                </div>
            </div>
            <br /><br />

           {/*footer section*/}
  <footer className="bg-white dark:bg-gray-900" id="footer">
  <div className="mx-auto w-full max-w-screen-xl">
    <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
      <div>
        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
        <ul className="text-gray-500 dark:text-gray-400 font-medium">
          <li className="mb-4"><a href="#" className="hover:underline">About</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Careers</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Brand Center</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Blog</a></li>
        </ul>
      </div>
      {/* Help Center Section */}
      <div>
        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help Center</h2>
        <ul className="text-gray-500 dark:text-gray-400 font-medium">
          <li className="mb-4"><a href="#" className="hover:underline">Discord Server</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Twitter</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Facebook</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Contact Us</a></li>
        </ul>
      </div>
      {/* Legal Section */}
      <div>
        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
        <ul className="text-gray-500 dark:text-gray-400 font-medium">
          <li className="mb-4"><a href="#" className="hover:underline">Privacy Policy</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Licensing</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Terms & Conditions</a></li>
        </ul>
      </div>
      {/* Download Section */}
      <div>
        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
        <ul className="text-gray-500 dark:text-gray-400 font-medium">
          <li className="mb-4"><a href="#" className="hover:underline">iOS</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Android</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">Windows</a></li>
          <li className="mb-4"><a href="#" className="hover:underline">MacOS</a></li>
        </ul>
      </div>
    </div>
    <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center"><a href="/"></a>Made with love Sunidhi.</span>
      <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
        {/* Social Media Links */}
        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Visit our Facebook page">
          {/* Facebook SVG */}
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Join our Discord community">
          {/* Discord SVG */}
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Follow us on Twitter">
          {/* Twitter SVG */}
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Check our GitHub account">
          {/* GitHub SVG */}
        </a>
      </div>
    </div>
  </div>
</footer> 

        </div>
    );
};

export default Home;