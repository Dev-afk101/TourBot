import React from 'react';
import '../../App.css';

export default function ContactUs() {
  return (
    <div className='contact'>
      <div className='contact-container'>
        <h1>Contact Us</h1>
        <p>Have questions or need assistance? Feel free to reach out to us!</p>
        
        <div className="contact-details">
          <p><strong>Email:</strong> <a href="mailto:devbhatt417@gmail.com">devbhatt417@gmail.com</a></p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Address:</strong> Mumbai, Maharashtra, India</p>
          <p><strong>LinkedIn:</strong> <a href="#">Click here</a></p>
        </div>
      </div>
    </div>
  );
}
