import { asyncErrorHandler, Error, Response } from "express-error-catcher";
import bcrypt from 'bcrypt';
import models from '../Models/index.js';
import { generateAuthToken } from "../Middleware/userAuth.js";

//Handle Register the user
export const UserRegister = asyncErrorHandler(async (req) => {
    
    let userDetails = req.body;
    const user = await models.Users.findOne({ email: userDetails.email });
    userDetails.password = await bcrypt.hash(userDetails.password, 10);
    userDetails.email = userDetails.email?.trim()
    userDetails.name = userDetails.name?.trim()

    if (!user) {
        await models.Users.create(userDetails);
    } else {
        return new Response("User with this Email already exists.",null, 400);
    }

    return new Response("Registered Successfully", null , 200);
});

//Handle Login User
export const UserLogin = asyncErrorHandler(async (req) => {
    
    const { email, password } = req.body;;

    const findUser = await models.Users.findOne({ email });
    if (!findUser) {
        return new Response("User not found",null, 400);
      }
 
      if (password) {
        const isPasswordMatch = await bcrypt.compare(password, findUser.password);
  
        if (!isPasswordMatch) {
            return new Response('Email or password is incorrect',null, 401);
        }
  
        const token = generateAuthToken(findUser);
        const { name } = findUser;
  
        const userResponse = {
          id: findUser._id,
          status: true,
          token,
          name,
        };
        return new Response("Successfully Sign In", {userResponse} , 200);
      } else {
        return new Response('Password is required',null, 401);
      }

});


