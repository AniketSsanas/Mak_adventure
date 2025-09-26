import React, { useState, useEffect } from 'react';
import '../CampingProducts.css';
import CampingBookingModal from './CampingBookingModal';
import accessories from '../data/accessories.json';

const CampingProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const vehicles = accessories;

  const handleBookNow = (vehicleName) => {
    setSelectedProduct(vehicleName);
    setIsModalOpen(true);
  };

  return (
    <section id="adventures" className={`features ${isVisible ? 'visible' : ''}`}>
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">Camping Gear & Equipment</h2>
          <p className="section-subtitle">Essential camping products for your outdoor adventures</p>
        </div>

        <div className="vehicle-grid">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className={`vehicle-card ${isVisible ? 'card-visible' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="card-image-container">
                <img src={vehicle.img} alt={vehicle.name} className="vehicle-image" />
                <div className="vehicle-icon">{vehicle.icon}</div>
                <div className="image-overlay"></div>
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3 className="vehicle-name">{vehicle.name}</h3>
                  <div className="vehicle-price">{vehicle.price}</div>
                </div>

                <p className="vehicle-description">{vehicle.desc}</p>

                <div className="vehicle-features">
                  {vehicle.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                <button
                  className="book-now-btn"
                  onClick={() => handleBookNow(vehicle.name)}
                >
                  <span className="btn-icon">⛺</span>
                  Rent Camping Gear
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CampingBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campingProduct={selectedProduct}
      />
    </section>
  );
};

export default CampingProducts;
