import mongoose, { Schema } from "mongoose";
import { COLLECTIONS } from "../config.js";

let CategorySchema = new Schema(
  {
    ip: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTIONS.CATEGORY,
      },
    name: {type: String, required:true },
    status: {type: Number, default: 0,enum:[0,1,2]}, // 0 - Active , 1 -deleted  , 2 - Inactive
  },
  { timestamps: true , collection:COLLECTIONS.SUB_CATEGORY }
);
let SubCategory = mongoose.model(COLLECTIONS.SUB_CATEGORY, CategorySchema);

export default SubCategory;
