import express from 'express';
import { sign, login, logout } from '../controller/admin-jest.js';

const routes = express.Router();

routes.post('/sign', sign);
routes.post('/login', login);
routes.post('/logout', logout);

export { routes as adminmovie };
