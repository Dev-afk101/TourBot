import React from 'react';
import '../../App.css';

export default function AboutUs() {
  return (
    <div className='about'> {/* Changed from 'services' to 'AboutUs' */}
      <div className='about-container'>
        <h1>About Us</h1>
        <p>
          Welcome to <strong>TourBOT</strong>, your smart travel companion designed to make exploring Maharashtra effortless and exciting! Whether you're a first-time visitor or a seasoned traveler, TourBOT is here to guide you through the vibrant cities, hidden gems, and cultural wonders of this incredible region.
        </p>
        <p>
          From must-visit attractions and local cuisine to travel tips and historical insights, TourBOT ensures you have all the information you need at your fingertips. We’re passionate about making travel planning easy, interactive, and fun—so you can focus on enjoying your journey.
        </p>
        <p>
          Start your adventure today with TourBOT and discover Maharashtra like never before!
        </p>
      </div>
    </div>
  );
}
