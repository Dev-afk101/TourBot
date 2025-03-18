import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AboutUs from './components/pages/AboutUs';
import Contact from './components/pages/Contact';
import SignUp from './components/pages/SingUP';
import Chat from './components/Chat'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/AboutUs' exact Component={AboutUs}/>
          <Route path='/Contact' exact Component={Contact}/>
          <Route path='/sign-up' exact Component={SignUp}/>
          <Route path='/chat' exact Component={Chat} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
