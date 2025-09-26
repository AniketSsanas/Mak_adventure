import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CampingBookingModal = ({ isOpen, onClose, campingProduct }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    message: '',
    bookingDate: ''
  });

  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://192.168.1.9:5000'}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.customerName,
          mobile: formData.mobileNumber,
          campingProduct: campingProduct,
          message: formData.message,
          bookingDate: formData.bookingDate
        })
      });

      if (response.ok) {
        toast.success('Our camping accessory provider will connect to you shortly. Thank you for choosing our platform!!!');
        setFormData({ customerName: '', mobileNumber: '', message: '', bookingDate: '' });
        onClose();
      } else {
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
        <h2>Book Your Camping Product</h2>
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
              <label htmlFor="message">Message to our camping accessory provider</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label>Camping Product</label>
              <input
                type="text"
                value={campingProduct}
                readOnly
              />
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

export default CampingBookingModal;
