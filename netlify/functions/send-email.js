const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { name, mobile, car, message, campingProduct, sourceLocation, destinationLocation, bookingDate } = JSON.parse(event.body);

    const isCamping = !!campingProduct;
    const product = car || campingProduct;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'makadventures1600@gmail.com',
        pass: 'gndastoabyjgeelo'
      }
    });

    const mailOptions = {
      from: 'makadventures1600@gmail.com',
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

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' }),
    };
  }
};
