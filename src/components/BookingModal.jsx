import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BookingModal = ({ isOpen, onClose, carName }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    customerMessage: '',
    sourceLocation: '',
    destinationLocation: '',
    carName: carName || '',
    bookingDate: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const cars = [
    'Mahindra Thar 4x4',
    'Audi Q5 Luxury SUV',
    'Off-Road Explorer',
    'Premium Adventure Vehicle'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.1.9:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.customerName,
          mobile: formData.mobileNumber,
          car: formData.carName,
          message: formData.customerMessage,
          sourceLocation: formData.sourceLocation,
          destinationLocation: formData.destinationLocation,
          bookingDate: formData.bookingDate
        })
      });

      if (response.ok) {
        toast.success(`Our car owner will connect to you shortly......
                         Thank you for choosing our platform!!!`);
        setFormData({ customerName: '', mobileNumber: '', customerMessage: '', sourceLocation: '', destinationLocation: '', carName: '', bookingDate: '' });
        onClose();
      } else {
        console.log(response)
        toast.error('Failed to send booking request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send booking request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Book Your Vehicle</h2>
        {isLoading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Generating booking request...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sourceLocation">Source Location</label>
              <input
                type="text"
                id="sourceLocation"
                name="sourceLocation"
                value={formData.sourceLocation}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="destinationLocation">Destination Location</label>
              <input
                type="text"
                id="destinationLocation"
                name="destinationLocation"
                value={formData.destinationLocation}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerMessage">Message to our car owner</label>
              <textarea
                id="customerMessage"
                name="customerMessage"
                value={formData.customerMessage}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="carName">Car Name</label>
              <select
                id="carName"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                required
                disabled={isLoading}
              >
                <option value="">Select a car</option>
                {cars.map((car, index) => (
                  <option key={index} value={car}>
                    {car}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bookingDate">Booking Date</label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
                disabled={isLoading}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="modal-actions">
              <button type="submit" disabled={isLoading}>Submit</button>
              <button type="button" onClick={onClose} disabled={isLoading}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
