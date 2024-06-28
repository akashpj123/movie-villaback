import express from 'express';
const router = express.Router();

import { upload, read, search, getMovie, deleteMovie ,editMovie} from '../controller/movie-jest.js';

router.post('/upload', upload);
router.get('/read', read);
router.get('/search/:key', search); // GET is appropriate for searching
router.get('/getMovie/:id', getMovie); // GET is appropriate for retrieving a specific movie
router.delete('/deleteMovie/:id', deleteMovie); // DELETE is appropriate for deleting a movie
router.put('/editMovie/:id', editMovie);
export { router as movie };
