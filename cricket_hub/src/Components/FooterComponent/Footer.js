// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p className="mb-0">© 2024 Cricket hub. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-white">Privacy Policy</a> | 
          <a href="/terms-of-service" className="text-white">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
