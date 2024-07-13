// src/App.jsx
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Flow from './components/Flow';

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/flow" element={<Flow/>}/>
      </Routes>
      {/* <Navigate to="/" /> */}
    </>
  );
};

export default App;
