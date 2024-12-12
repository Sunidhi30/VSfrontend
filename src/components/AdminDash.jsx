
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from "react-icons/md";
import { ColorRing } from 'react-loader-spinner';

const AdminDash = () => {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [editingCandidateId, setEditingCandidateId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    partyname: '',
    partylogo: ''
  });

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:4444/admin');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const editCandidate = async (id, updatedCandidate) => {
    try {
      await axios.put(`http://localhost:4444/admin/${id}`, updatedCandidate);
      fetchCandidates();
      setEditingCandidateId(null);
    } catch (error) {
      console.error('Error editing candidate:', error);
      setError('Failed to edit candidate. Please try again later.');
    }
  };

  const deleteCandidate = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:4444/admin/${id}`);
      fetchCandidates();
    } catch (error) {
      console.error('Error deleting candidate:', error);
      setError('Failed to delete candidate. Please try again later.');
    }
  };

  const handleEditClick = (candidate) => {
    setEditingCandidateId(candidate.id);
    setFormData({
      fullName: candidate.fullName,
      partyname: candidate.partyname,
      partylogo: candidate.partylogo
    });
  };

  const uploadFileToCloudinary = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", 'images_preset');

    try {
      const cloudName = 'dnwiocldo';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const response = await axios.post(api, data);
      const { secure_url } = response.data;
      return secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let logoUrl = formData.partylogo;

    try {
      if (file) {
        logoUrl = await uploadFileToCloudinary();
        console.log("Image uploaded successfully, URL:", logoUrl);
      }

      await editCandidate(editingCandidateId, {
        fullName: formData.fullName,
        partyname: formData.partyname,
        partylogo: logoUrl
      });
    } catch (error) {
      console.error('Error during form submission:', error);
      setError('Failed to update candidate. Please try again later.');
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="w-[80%] min-h-screen bg-cover bg-center ml-[20%] relative" style={{ backgroundImage: `url(${"https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63452.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726444800&semt=ais_hybrid"})` }}>
      {loading && (
        <div className="flex justify-center items-center h-full">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
          <p>Loading...</p>
        </div>
      )}
      {!loading && (
        <div className="mx-auto px-4 py-0 w-full h-full">
          {error && <p>{error}</p>}
          <table className="w-full mt-6 table-fixed border-collapse border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
                <th className="w-1/6 border px-4 py-2 border-gray-300">S.No</th>
                <th className="w-2/6 border px-4 py-2 border-gray-300">Name of Candidate</th>
                <th className="w-1/6 border px-4 py-2 border-gray-300">Name of Party</th>
                <th className="w-1/6 border px-4 py-2 border-gray-300">Party Logo</th>
                <th className="w-1/6 border px-4 py-2 border-gray-300">No of Votes</th>
                <th className="w-1/6 border px-4 py-2 border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {candidates.map((candidate, index) => (
                <tr key={candidate.id} className="hover:bg-gray-100 transition-all">
                  <td className="w-1/6 border px-4 py-2 border-gray-300 text-center">{index + 1}</td>
                  <td className="w-2/6 border px-4 py-2 border-gray-300">{candidate.fullName}</td>
                  <td className="w-1/6 border px-4 py-2 border-gray-300">{candidate.partyname}</td>
                  <td className="w-1/6 border px-4 py-2 border-gray-300 text-center">
                    <img src={candidate.partylogo} width="64px" height="64px" alt="Party Logo" className="mx-auto rounded-full"/>
                  </td>
                  <td className="w-1/6 border px-6 py-2 border-gray-300 text-center">{candidate.totalvotes}</td>
                  <td className="w-6/9 border px-4 py-4 border-gray-300 flex justify-center items-center gap-2 space-x-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-md" onClick={() => handleEditClick(candidate)}>
                      <MdEdit />
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded" onClick={() => deleteCandidate(candidate.id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editingCandidateId && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-8 w-[90%] md:w-[50%] shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Edit Candidate</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name of Candidate:</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="border w-full p-2 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name of Party:</label>
                    <input
                      type="text"
                      value={formData.partyname}
                      onChange={(e) => setFormData({ ...formData, partyname: e.target.value })}
                      className="border w-full p-2 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Party Logo:</label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="border w-full p-2 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                      onClick={() => setEditingCandidateId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDash;
