

import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import models from '../Models/index.js';
import { COLLECTIONS, isNull } from "../config.js";
import { ObjectId } from "mongodb";

export const AddProduct = asyncErrorHandler(async (req) => {
  let data = req.body;
  data.ip = req.ip;
  data.tittle = data.tittle?.trim();

  const subCategory = await models.SubCategory.findOne({ _id: data?.subCategoryId });
  data.categoryId = subCategory?.categoryId;
  
  const newProduct = new models.Product(data);
  await newProduct.save(); 

  return new Response("Product Added Successfully", null, 200);
});


// Handle Update the Product
export const UpdateProduct = asyncErrorHandler(async (req) => {
  let data = req.body;
  data.tittle = data.tittle?.trim();

  if (!data._id) {
    throw new Error("Product ID is required for updating.");
  }

  let updated = await models.Product.updateOne({ _id: data._id }, { $set: data });

  if (updated.modifiedCount > 0) {
    return new Response("Product updated successfully", null, 200);
  } else {
    throw new Error("Failed to update. Please ensure the ID is correct and try again.");
  }
});


// List All products
  export const ListAllProducts = asyncErrorHandler(async (req) => {
    let { page = 1, limit = 20 ,selectedIds , productId , search} = req.query;
    page = Number(page);
    limit = Number(limit);
    let skip = (page - 1) * limit;
  
    let match = { status: 0 };
    selectedIds = selectedIds ? selectedIds.split(',') : [];    
    selectedIds = selectedIds?.map((item) => new ObjectId(item))  
    if(selectedIds && selectedIds?.length > 0){
      match.subCategoryId = {$in:selectedIds}
    }
    const userId = req?.user?.payload?._id || "";

    if(!isNull(productId)) match._id = new ObjectId(productId)
    if (!isNull(search)) match.tittle = { $regex: search, $options: "i" };

    let projection = {
      tittle: 1,
      variants: 1,
      description: 1,
      image: 1,
      subCategoryId:1
    }

    if(!isNull(userId)){
      projection.isInWishList = { $gt: [{ $size: "$wishlistData" }, 0] }
    }

    const count = await models.Product.countDocuments(match).exec();
  
    let data = await models.Product.aggregate([
      {
        $match: match,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      ...(!isNull(userId)
        ? [
            {
              $lookup: {
                from: COLLECTIONS.WISH_LIST,
                let: { productId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$userId", new ObjectId(userId)] },
                          { $in: ["$$productId", "$products"] },
                        ],
                      },
                    },
                  },
                ],
                as: "wishlistData",
              },
            },
          ]
        : []),
      {
        $project: projection,
      },
    ]);
  
    return new Response("Successfull", { data, count }, 200);
  });