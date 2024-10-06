import mongoose, { Schema } from "mongoose";
import { COLLECTIONS } from "../config.js";

const wishListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTIONS.USERS,
        required: true,  
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: COLLECTIONS.PRODUCT,
    }],
}, {
    timestamps: true,
    collection: COLLECTIONS.WISH_LIST  
});

const WishList = mongoose.model(COLLECTIONS.WISH_LIST, wishListSchema);

export default WishList;
