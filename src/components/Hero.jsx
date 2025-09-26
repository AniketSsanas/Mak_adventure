import React, { useState, useEffect } from 'react';
import '../Hero.css';
import BookingModal from './BookingModal';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');

  const backgroundImages = [
    {
      url: 'https://wallpaperaccess.com/full/3939234.jpg',
      title: 'Mahindra Thar 4x4'
    },
    {
      url: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&h=1080&fit=crop',
      title: 'Audi Q5 Luxury SUV'
    },
    {
      url: 'https://wallpapers.com/images/hd/full-moon-red-thar-4k-hfk5vbgrykgzw2xc.jpg',
      title: 'Off-Road Explorer'
    },
    {
      url: 'https://wallpapercave.com/wp/wp6669217.jpg?w=1920&h=1080&fit=crop',
      title: 'Premium Adventure Vehicle'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleBookClick = () => {
    // Add some animation before opening the modal
    const button = document.querySelector('.book-button');
    if (button) {
      button.style.animation = 'none';
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
        button.style.animation = 'buttonPulse 2s ease-in-out infinite';
        setIsModalOpen(true);
      }, 150);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar('');
  };

  return (
    <section
      id="home"
      className={`hero-carousel ${isLoaded ? 'loaded' : ''}`}
      style={{
        backgroundImage: `url(${backgroundImages[currentImageIndex].url})`
      }}
    >
      {/* Animated background overlay */}
      <div className="hero-overlay"></div>

      {/* Floating elements */}
      <div className="floating-elements">
        <div className="floating-element mountain-1">🏔️</div>
        <div className="floating-element mountain-2">⛰️</div>
        <div className="floating-element hiker">🥾</div>
        <div className="floating-element backpack">🎒</div>
      </div>

      {/* Main content */}
      <div className="carousel-content">
        <div className="content-wrapper">
          <div className="image-title">{backgroundImages[currentImageIndex].title}</div>
          <div className="button-tag">Ready for Adventure?</div>
          <button
            className="book-button"
            onClick={handleBookClick}
            type="button"
            tabIndex={0}
            aria-label="Start your adventure journey"
          >
            <span className="button-icon">🚗</span>
            Start Your Adventure
            <span className="button-icon">🏔️</span>
          </button>
          <div className="subtitle">Discover breathtaking destinations and create unforgettable memories</div>
        </div>
      </div>

      {/* Enhanced carousel indicators */}
      <div className="carousel-indicators">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
            type="button"
            tabIndex={0}
            aria-label={`View ${backgroundImages[index].title}`}
          >
            <span className="indicator-dot"></span>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((currentImageIndex + 1) / backgroundImages.length) * 100}%`
          }}
        ></div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        carName={selectedCar}
      />
    </section>
  );
};

export default Hero;
