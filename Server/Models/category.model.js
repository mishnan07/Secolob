import mongoose, { Schema } from "mongoose";
import { COLLECTIONS } from "../config.js";

let categorySchema = new Schema(
  {
    ip: String,
    name: {type: String, required:true},
    status: {type: Number, default: 0,enum:[0,1,2]}, // 0 - Active , 1 - delete  , 2 -Inactive 
  },
  { timestamps: true , collection:COLLECTIONS.CATEGORY }
);
let Category = mongoose.model(COLLECTIONS.CATEGORY, categorySchema);

export default Category;
