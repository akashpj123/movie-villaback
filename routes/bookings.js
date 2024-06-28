// Import necessary modules
import express from 'express';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';

import { book as Booking } from '../model/book.js';

// Create a router
const router = express.Router();

// Route to fetch all bookings
router.get('/book', async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('name');
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch a specific booking by ID
router.get('/book/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('name');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to generate and download a ticket PDF for a booking
router.get('/download-ticket/:bookingId', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId).populate('name');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const qrCodeData = `Booking ID: ${booking._id}\nMovie: ${booking.name}\nDate: ${new Date(booking.date).toLocaleDateString()}\nTime: ${booking.time}`;
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=ticket_${booking._id}.pdf`);
        doc.pipe(res); // Pipe the PDF output directly to the response

        doc.fontSize(16).text('Booking Ticket', { align: 'center' }).moveDown(0.5);
        doc.text(`Booking ID: ${booking._id}`);
        doc.text(`Movie: ${booking.name}`);
        doc.text(`Date: ${new Date(booking.date).toLocaleDateString()}`);
        doc.text(`Time: ${booking.time}`);
        doc.text(`Email: ${booking.email}`);
        doc.image(qrCodeImage, { fit: [250, 250], align: 'center', valign: 'center' });
        doc.end(); // End the document
    } catch (error) {
        console.error('Error generating ticket PDF:', error);
        res.status(500).json({ error: 'Failed to generate ticket PDF' });
    }
});

// Route to send booking details with QR code as an email attachment
router.post('/send-email/:bookingId', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId).populate('name');
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const qrCodeData = `Booking ID: ${booking._id}\nMovie: ${booking.name}\nDate: ${new Date(booking.date).toLocaleDateString()}\nTime: ${booking.time}`;
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a03b4fa47ec211",
                pass: "848f0740778a93"
            }
        });

        const mailOptions = {
            from: 'liliana83@ethereal.email',
            to: booking.email,
            subject: 'Booking Details and QR Code',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Booking Details</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f0f0f0;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .booking-detail {
                  margin-bottom: 10px;
                }
                .booking-detail label {
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Booking Details</h1>
                <div class="booking-detail">
                  <label>Booking ID:</label> <span>${booking._id}</span>
                </div>
                <div class="booking-detail">
                  <label>Movie:</label> <span>${booking.name}</span>
                </div>
                <div class="booking-detail">
                  <label>Date:</label> <span>${new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div class="booking-detail">
                  <label>Time:</label> <span>${booking.time}</span>
                </div>
                <div class="booking-detail">
                  <label>Email:</label> <span>${booking.email}</span>
                </div>
                <div class="qr-code">
              <img src="${qrCodeImage}" alt="QR Code">
            </div>
              </div>
            </body>
            </html>
        `,

            attachments: [
                {
                    filename: 'booking_qr_code.png',
                    content: qrCodeImage.split(';base64,').pop(),
                    encoding: 'base64'
                }
            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Export the router
export { router as bookings };
