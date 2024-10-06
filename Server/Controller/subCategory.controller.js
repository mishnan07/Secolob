
import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import models from '../Models/index.js';

//Handle Add sub category
export const AddSubCategory = asyncErrorHandler(async (req) => {
  let data = req.body;
  data.ip = req?.ip;
  data.name = data?.name?.trim()

  let Exists = await models.SubCategory.findOne({
    status: { $ne: 1 },
    name: data?.name,
  });
  if (Exists) {
    return new Response("Sub Category Name already exists.", null, 400);
  }
  await models.SubCategory(data).save();
  return new Response("Sub Category Added Successfully", null, 200);
});


export const UpdateSubCategory = asyncErrorHandler(async (req) => {
  let data = req?.body;
  data.name = data?.name?.trim()

  let Exists = await models.SubCategory.findOne({
    _id: { $ne: req?.body?.id },
    status: { $ne: 1 },
    name: data?.name,
  });

  if (Exists) {
    throw new Error("Sub Category Name already exists.", 400);
  }
  let updated = await models.SubCategory.updateOne({ _id: data?.id }, { $set: data });

  if (updated.modifiedCount > 0) {
    return new Response("Sub Category updated successfully", null, 200);
  } else {
    throw new Error("Failed to update, Please try again");
  }
});


//Handle Add sub category
export const ListAllCategory = asyncErrorHandler(async (req) => {

  const data = await models.Category.aggregate([
    {
      $match: { status: 0 }
    },
     {
      $lookup: {
        from: "subCategory",
        let: { categoryId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$categoryId", "$$categoryId"] }
            }
          },
          {
            $project: {
              name: 1,
              _id: 1
            }
          }
        ],
        as: "subCategory"
      }
    },
    {
      $project: {
        category: "$name",
        subCategory: 1
      }
    }
  ]
  )

  return new Response("Sub Category Added Successfully", {data}, 200);
});