import express from 'express';
import * as controller from "../Controller/option.controller.js";

const route = express.Router()

route.get('/category',controller.CategoryOptions)
route.get('/sub-category',controller.SubCategoryOptions)




export default route;   