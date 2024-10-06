import mongoose from "mongoose";
import { COLLECTIONS } from "../config.js";

const { Schema, ObjectId } = mongoose;

const ProductsSchema = new Schema(
  {
    ip: String,
    status: { type: Number, required: true, default: 0 }, // 0 - Active , 1 - Deleted  , 2 - Inactive
    tittle: {type: String, required:true},
    variants:[
        {
          ram: { type: String },
          price: { type: Number },
          quantity: { type: Number },
        },
      ],
    description: {type: String, required:true},
    image:[String],
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: COLLECTIONS.CATEGORY,
      index: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: COLLECTIONS.SUB_CATEGORY,
      index: true,
    },
  },
  { timestamps: true , collection:COLLECTIONS.PRODUCT }
);

const Product = mongoose.model(COLLECTIONS.PRODUCT, ProductsSchema);

export default Product;
