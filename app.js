import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';

// Import your routers
import { adminmovie } from './routes/admin-movie.js';
import { usermovie } from './routes/user-movie.js';
import { movie } from './routes/movie.js';
import { booking } from './routes/booking.js';
import { bookings } from './routes/bookings.js';
import { paymentRoutes } from './routes/payment.js';

const app = express();

// Use middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Define routes
app.use('/admin', adminmovie);
app.use('/user', usermovie);
app.use('/movie', movie);
app.use('/api/payment', paymentRoutes);
app.use('/booking', booking);
app.use('/bookings', bookings);

// MongoDB connection

// MongoDB connection
const db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});






// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
