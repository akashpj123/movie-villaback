import express from "express";
var routes = express.Router();
import{sign,login,logout}from '../controller/user-jest.js';

routes.post('/sign',sign);
routes.post('/login',login);
routes.post('/logout',logout);
export{routes as usermovie}