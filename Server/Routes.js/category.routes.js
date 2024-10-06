import express from 'express';
import * as controller from "../Controller/category.controller.js";

const route = express.Router()

route.post('/',controller.AddCategory)
// route.post('/login',controller.UserLogin)




export default route;   