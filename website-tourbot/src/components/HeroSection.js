import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          to='/sign-up' // Specify the route for the Sign Up button
        >
          GET STARTED
        </Button>
        <Button
  className='btns'
  buttonStyle='btn--primary'
  buttonSize='btn--large'
  onClick={() => window.location.href = 'http://localhost:5173'} // Change to your React app URL
>
  Start Chat <i className='fas fa-message' />
</Button>




      </div>
    </div>
  );
}

export default HeroSection;
