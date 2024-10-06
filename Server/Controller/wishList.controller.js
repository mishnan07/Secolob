import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import models from '../Models/index.js';
import { ObjectId } from 'mongodb';
import { COLLECTIONS } from "../config.js";

//Handle Add product to wish list
export const AddProductToWishList = asyncErrorHandler(async (req) => {
    const productId = req.body.productId; 
    const userId = req?.user?.payload?._id;     

    let wishlist = await models.WishList.findOne({ userId });
    if (!wishlist) {
        wishlist = new models.WishList({ userId, products: [] });
    }

    // Check if the product is already in the wishlist
    if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
        return new Response("Product added to wishlist successfully", null, 200);
    } else {
        // Remove the product from the wishlist        
        wishlist.products = wishlist.products.filter((item) => !item.equals(productId));
        await wishlist.save();
        return new Response("Product removed from wishlist successfully", null, 200);
    }
});

//Handle wish list
export const WishList = asyncErrorHandler(async (req) => {
    const userId = req?.user?.payload?._id;  

    if(!userId) return new Response("User ID not found", null, 200);

    const data = await models.WishList.aggregate([
        {
           $match: {
               userId: new ObjectId(userId)
           }
        },
        {
            $lookup: {
              from: COLLECTIONS.PRODUCT,
              let: { productIds: "$products" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$productIds"]
                    }
                  }
                },
                {
                  $project:{
                    tittle:1,
                    image:1,
                    variants:1
                  }
                }
              ],
              as: "productData",
            },
        },
        {
            $project:{
                productData:1
            }
        }
    ]);

    return new Response("Successful", { data }, 200);
});

// Handle wish list items count
export const WishListCount = asyncErrorHandler(async (req) => {
    const userId = req?.user?.payload?._id;

    if (!userId) return new Response("User ID not found", null, 400);
    
    const wishlist = await models.WishList.findOne({ userId: new ObjectId(userId) });
    
    if (!wishlist) {
        return new Response("Wishlist not found", { count: 0 }, 400);
    }

    const count = wishlist.products.length || 0;
    return new Response("Successful", { count }, 200);
});



