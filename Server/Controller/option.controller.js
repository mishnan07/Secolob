

import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import models from '../Models/index.js';

//List category options
export const CategoryOptions = asyncErrorHandler(async (req, res) => {    
    const data = await models.Category.find(
      { status: 0 },
      { label: "$name", value: "$_id", _id: 0 }
    ).sort({ _id: -1 });
    return new Response(null, { data }, 200);
  });

  //List sub category options
  export const SubCategoryOptions = asyncErrorHandler(async (req, res) => {    
    const data = await models.SubCategory.find(
      { status: 0 },
      { label: "$name", value: "$_id", categoryId:1, _id: 0 }
    ).sort({ _id: -1 });
    return new Response(null, { data }, 200);
  });