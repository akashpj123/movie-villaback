import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  name: {
     type: String, 
     required: true 
  },
  description: {
    type: String,
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  bookingStartDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
});

export const addmov = mongoose.model('Movie', movieSchema);
