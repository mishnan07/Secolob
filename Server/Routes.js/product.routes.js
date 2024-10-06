import express from 'express';
import * as controller from "../Controller/product.controller.js";
import { imageFileName, multerUpload } from '../helper/functions.js';
import { authMiddleware as auth } from '../Middleware/userAuth.js';

const route = express.Router()


const uploadImage = multerUpload("product", null, { fileSize: 10 * 1024 * 1024 });

route.post("/image",  uploadImage.single("file"), imageFileName);

route.post('/',controller.AddProduct)
route.put('/',controller.UpdateProduct);
route.get('/',controller.ListAllProducts);
route.get('/auth', auth ,controller.ListAllProducts);


export default route;   