import express from 'express';
import * as controller from "../Controller/wishList.controller.js";
import { authMiddleware as auth } from '../Middleware/userAuth.js';

const route = express.Router()

route.put('/', auth ,controller.AddProductToWishList)
route.get('/', auth ,controller.WishList)
route.get('/count', auth ,controller.WishListCount)




export default route;   