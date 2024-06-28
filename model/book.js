import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  people: {
    type: [String],
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },

    name: {
      type:String,
      required: true,
    },
  
});

export const book = mongoose.model('Book', movieSchema);
