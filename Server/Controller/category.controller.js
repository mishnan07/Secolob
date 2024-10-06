
import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import models from '../Models/index.js';

//Handle Add Category
export const AddCategory = asyncErrorHandler(async (req) => {
    let data = req.body;
    data.ip = req?.ip;
    data.name = data?.name?.trim()
  
    let Exists = await models.Category.findOne({
      status: { $ne: 1 },
      name: data?.name,
    }); 
    if (Exists) {
        return new Response("Category Name already exists", null, 400);
    }
  
    await models.Category(data).save();
  
    return new Response("Category Added Successfully", null, 200);
  });


  export const UpdateCategory = asyncErrorHandler(async (req) => {
    let data = req?.body;
    data.name = data?.name?.trim()

    let Exists = await models.Category.findOne({
      _id: { $ne: req?.body?.id },
      status: { $ne: 1 },
      name: data?.name,
    });
  
    if (Exists) {
      return new Response(" Category Name already exists.", null, 200);
    }
  
    let updated = await models.Category.updateOne({ _id: data?.id }, { $set: data });
  
    if (updated.modifiedCount > 0) {
      return new Response("Category updated successfully", null, 200);
    } else {
      throw new Error("Failed to update, Please try again");
    }
  });