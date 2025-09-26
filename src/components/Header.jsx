import React, { useState } from 'react';
import Logo from './Logo';
import '../Logo.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Logo size="small" className="header-logo" />

        <nav className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          <a href="#home" className="nav-link">Home</a>
          <a href="#vehicles" className="nav-link">Vehicles</a>
          <a href="#adventures" className="nav-link">Adventures</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        <div className="header-actions">
          <button className="book-now-header-btn">
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
