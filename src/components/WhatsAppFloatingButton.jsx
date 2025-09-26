import React from 'react';
import '../WhatsAppFloatingButton.css';

const WhatsAppFloatingButton = () => {
  const phoneNumber = '9137314583'; // Owner's WhatsApp number
  const message = 'Hello, I would like to inquire about your services.';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button className="whatsapp-floating-button" onClick={handleClick} aria-label="Chat on WhatsApp" title="Chat with us on WhatsApp">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="whatsapp-icon" />
    </button>
  );
};

export default WhatsAppFloatingButton;
