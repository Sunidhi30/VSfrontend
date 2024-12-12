
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Outlet, useNavigate } from 'react-router-dom';

const AddCandidate = () => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef("");
  const navigate = useNavigate();
  
  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", inputRef.partyLogo);
    data.append("upload_preset", 'images_preset');
    try {
      let cloudName = 'dnwiocldo';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const response = await axios.post(api, data);
      const { secure_url } = response.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  async function addCandidate(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let imageUrl = await uploadFile('image');
      const response = await axios.post(`http://localhost:4444/admin`, {
        fullname: inputRef.fullname,
        nationality: inputRef.nationality,
        dob: inputRef.dob,
        partyName: inputRef.partyName,
        partyLogo: imageUrl,
      });
      console.log(response.data);
      setLoading(false);
      window.alert("Candidate added successfully!");
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-[80%] min-h-screen ml-[20%]'>
      <div className="bg-gray-100 min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${"https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63452.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726444800&semt=ais_hybrid"})` }}>
        <div className="container mx-auto py-7">
          
          {loading && <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />}
          
          <form className="max-w-md m-auto bg-white p-8 rounded-lg shadow-lg" onSubmit={addCandidate}>
            <h1 className="text-3xl font-bold text-center mb-6">Add Candidate</h1>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                Fullname
              </label>
              <input onChange={(e) => { inputRef.fullname = e.target.value }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="Enter candidate name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nationality">
                Nationality
              </label>
              <input onChange={(e) => { inputRef.nationality = e.target.value }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nationality"
                type="text"
                placeholder="Enter nationality"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                Date Of Birth
              </label>
              <input onChange={(e) => { inputRef.dob = e.target.value }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dob"
                type="text"
                placeholder="Enter in YYYY-MM-DD format"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partyName">
                Name of Party
              </label>
              <input onChange={(e) => { inputRef.partyName = e.target.value }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="partyName"
                type="text"
                placeholder="Enter party name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partylogo">
                Party Logo
              </label>
              <input onChange={(e) => { inputRef.partyLogo = e.target.files[0] }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="partyLogo"
                type="file"
                accept='image/*'
                placeholder="Enter party logo"
              />
            </div>

            <div className="flex items-center justify-center">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Add 
              </button>
            </div>
          </form>

        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AddCandidate;
