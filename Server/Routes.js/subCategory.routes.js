import express from 'express';
import * as controller from "../Controller/subCategory.controller.js";

const route = express.Router()

route.post('/',controller.AddSubCategory)

route.get('/list',controller.ListAllCategory)


export default route;   