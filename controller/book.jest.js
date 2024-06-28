import { book  as book  } from '../model/book.js'; // Assuming the model is named User

// Create movie
export const upload = async (req, res) => {
  try {
    const booking = await book.create({
      email: req.body.email,
      date: req.body.date,
      time: req.body.time,
      people: req.body.people,
      rate: req.body.rate,
      name:req.body.name
    });
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const read = async (req, res) => {
  try {
    const bookings = await book.find(); // Fetch all bookings from the database
    console.log(bookings); // Log the fetched data

    res.status(200).json(bookings); // Send the fetched data as a JSON response
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};