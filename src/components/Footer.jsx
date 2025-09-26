import React from 'react';
import '../Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <p>&copy; {new Date().getFullYear()} GSM Adventures. All rights reserved.</p>
      <div className="socials">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> |
        <a href="mailto:mandave1234567@gmail.com">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
