const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'makadventures1600@gmail.com' ,
    pass: 'gndastoabyjgeelo'
  }
});

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, mobile, car, message, campingProduct, sourceLocation, destinationLocation, bookingDate } = req.body;

  const isCamping = !!campingProduct;
  const product = car || campingProduct;

  const mailOptions = {
    from:'makadventures1600@gmail.com',
    to: 'aniketsanas1999@gmail.com',
    subject: isCamping ? 'New Camping Accessory Booking Request' : 'New Car Booking Request',
    html: `
      <h2>New ${isCamping ? 'Camping Accessory' : 'Car'} Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>${isCamping ? 'Camping Accessory' : 'Car'}:</strong> ${product}</p>
      <p><strong>Message:</strong> ${message}</p>
      ${sourceLocation ? `<p><strong>Source Location:</strong> ${sourceLocation}</p>` : ''}
      ${destinationLocation ? `<p><strong>Destination Location:</strong> ${destinationLocation}</p>` : ''}
      ${bookingDate ? `<p><strong>Booking Date:</strong> ${bookingDate}</p>` : ''}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
