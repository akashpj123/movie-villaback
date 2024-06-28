import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
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
  
    origin: ["https://movie-villa-chi.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
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
// MongoDB connection using Mongoose
const uri = process.env.MONGODB_URI || "mongodb+srv://movie:akash123@movie-villa.xmqepbp.mongodb.net/movie-villa?retryWrites=true&w=majority&appName=movie-villa";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of waiting indefinitely
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);






// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
