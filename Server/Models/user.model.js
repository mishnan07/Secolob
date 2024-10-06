import mongoose, { Schema } from "mongoose";
import { COLLECTIONS } from "../config.js";

let schema = new Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required:true
  },
},
{ timestamps: true, collection: COLLECTIONS.USERS }
);

const Users = mongoose.model(COLLECTIONS.USERS, schema);

export default Users;
