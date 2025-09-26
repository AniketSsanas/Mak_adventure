import React from 'react';
import logoImage from '../assets/images/logo.jpeg';

const Logo = ({ className = '', size = 'small' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const handleLogoClick = () => {
    const heroElement = document.getElementById('home');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`logo-container ${sizeClasses[size]} ${className}`}>
      <img
        src={logoImage}
        alt="GSM Adventure Logo"
        className="gsm-logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default Logo;
