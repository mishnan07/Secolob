import express from "express";
const app = express.Router();

import Users from './user.routes.js'
import Category from './category.routes.js'
import Options from './option.routes.js'
import subCategory from './subCategory.routes.js'
import Product from './product.routes.js'
import WishList from './wishList.routes.js'

app.get("/", (req, res) => res.send("User Runnings 🚀"));

app.use("/user", Users);
app.use("/category", Category);
app.use("/sub-category", subCategory);
app.use("/options", Options);
app.use("/product", Product);
app.use("/wishList", WishList);

export default app;
