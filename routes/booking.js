import express from 'express';
import { upload, read } from '../controller/book.jest.js';

const routes = express.Router();

routes.post('/upload', upload);
routes.get('/read', read);

export { routes as booking };
