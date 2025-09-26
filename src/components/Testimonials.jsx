import React, { useState, useEffect } from 'react';
import '../Testimonials.css';
import aniket from '../assets/images/IMG_20240714_112124794_HDR.jpg'
import sand from '../assets/images/IMG_20240714_131512253.jpg'
import ganesh from '../assets/images/IMG_20240714_121012813_MF_PORTRAIT.jpg'
import akash from '../assets/images/IMG_20240714_132204917.jpg'


const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000); // Change review every 4 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  const reviews = [
    {
      name: "Aniket Sanas",
      text: "The 4x4 Adventure Jeep was perfect for reaching those remote mountain trails! Handled every terrain like a champ. Incredible experience!",
      location: "nerul, navi mumbais",
      vehicle: "4x4 Adventure Jeep",
      rating: 5,
      avatar: aniket
    },
    {
      name: "Ganesh Mandave",
      text: "We drove through the most beautiful forest trails to our hiking destination. The All-Terrain SUV made the journey unforgettable!",
      location: "koregao, satara",
      vehicle: "All-Terrain SUV",
      rating: 5,
      avatar: ganesh
    },
    {
      name: "Akash Mandave",
      text: "The Trail Explorer Bike got me to hidden trails I never could have reached otherwise. Perfect for solo adventures. Will definitely rent again!",
      location: "kokrale, khatav",
      vehicle: "Trail Explorer Bike",
      rating: 5,
      avatar:akash
    },
    {
      name: "Rohit Mandave",
      text: "Outstanding service from start to finish. The vehicle was pristine and our hiking adventure was exactly what we hoped for!",
      location: "sangli, maharashtra",
      vehicle: "4x4 Adventure Jeep",
      rating: 5,
      avatar: aniket
    },
    {
      name: "Nishad Mandave",
      text: "Professional, reliable, and the vehicles are always in perfect condition. Makes every adventure trip memorable and stress-free.",
      location: "vaduj, india",
      vehicle: "All-Terrain SUV",
      rating: 5,
      avatar: akash
    },
    {
      name: "sandip Mandave",
      text: "From the moment we booked to returning the vehicle, everything was seamless. The team really knows how to make adventures special!",
      location: "vaduj, satara",
      vehicle: "Trail Explorer Bike",
      rating: 5,
      avatar: sand
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ⭐
      </span>
    ));
  };

  return (
    <section className={`testimonials ${isVisible ? 'visible' : ''}`}>
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Our Adventure Travelers Say</h2>
          <p className="section-subtitle">Real experiences from our satisfied customers</p>
        </div>

        <div className="testimonials-content">
          {/* Featured Review */}
          <div className="featured-review">
            <div className={`review-card featured ${isVisible ? 'card-visible' : ''}`}>
              <div className="quote-icon">💬</div>
              <div className="review-content">
                <p className="review-text">"{reviews[currentReview].text}"</p>
                <div className="review-author">
                  <img
                    src={reviews[currentReview].avatar}
                    alt={reviews[currentReview].name}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{reviews[currentReview].name}</h4>
                    <p className="author-details">{reviews[currentReview].location}</p>
                    <p className="author-vehicle">Rented: {reviews[currentReview].vehicle}</p>
                  </div>
                </div>
                <div className="rating-container">
                  <div className="stars">
                    {renderStars(reviews[currentReview].rating)}
                  </div>
                  <span className="rating-text">Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review Grid */}
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`review-card ${isVisible ? 'card-visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-header">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="avatar"
                  />
                  <div className="reviewer-info">
                    <h4 className="reviewer-name">{review.name}</h4>
                    <p className="reviewer-location">{review.location}</p>
                  </div>
                </div>

                <div className="stars-mobile">
                  {renderStars(review.rating)}
                </div>

                <p className="review-text-small">"{review.text}"</p>

                <div className="card-footer">
                  <span className="vehicle-tag">{review.vehicle}</span>
                  <div className="rating-small">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="review-indicators">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentReview ? 'active' : ''}`}
              onClick={() => setCurrentReview(index)}
            >
              <span className="indicator-dot"></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
