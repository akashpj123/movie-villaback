import { addmov as Movie } from '../model/addmovie.js';

// Create movie
export const upload = async (req, res) => {
  try {
    const newMovie = await Movie.create({
      name: req.body.name,
      description: req.body.description,
      actors: req.body.actors,
      bookingStartDate: req.body.bookingStartDate,
      posterUrl: req.body.posterUrl,
    });
    res.status(201).json(newMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Read movies
export const read = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search movie data
export const search = async (req, res) => {
  try {
    const key = req.params.key;
    const search = new RegExp(key, 'i');
    const movies = await Movie.find({ name: search });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get movie by ID
export const getMovie = async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'The movie with the given ID does not exist.' });
    }
    res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error occurred in fetching the movie' });
  }
};

// Delete movie
export const deleteMovie = async (req, res) => {
  const movieId = req.params.id;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully', deletedMovie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Edit movie
export const editMovie = async (req, res) => {
  const movieId = req.params.id;
  const { name, description, actors, bookingStartDate, posterUrl } = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { name, description, actors, bookingStartDate, posterUrl },
      { new: true } // Return the updated document
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: 'The movie with the given ID does not exist.' });
    }
    res.status(200).json(updatedMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
