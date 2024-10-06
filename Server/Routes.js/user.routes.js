import express from 'express';
import * as controller from "../Controller/user.controller.js";

const route = express.Router()

route.post('/register',controller.UserRegister)
route.post('/login',controller.UserLogin)



export default route;   