// import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddCandidate from './components/AddCandidate'
import Admin from './components/Admin'
import AdminDash from './components/AdminDash'
import ForgetPassword from './components/ForgetPassword'
import Home from './components/Home'
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'
import Result from './components/Result'
import SignUp from './components/SignUp'
import Voted from './components/Voted'
import VoterCard from './components/VoterCard'
import VotingComponent from './components/Voting'

function App() {
  return (
    <>
    {/* <Login/>*/}
    {/*<SignUp/> */}
    {/* <Admin/> */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/results" element={<Result/>}/> 
      <Route path="/admin" element={<Admin />}>
    <Route index element={<AdminDash />} />
    <Route path="add" element={<AddCandidate />} />
    <Route path="results" element={<Result />} />
    <Route path="home" element={<AdminDash />} />
    {/* <Route path="profile" element={<Profile} */}
  </Route>


      <Route path="/vote" element={<VotingComponent/>}/> 
      <Route path="/vote/profile" element={<VoterCard/>}/>
      <Route path="/voted" element={<Voted/>} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
    
    </>
  )
}

export default App
