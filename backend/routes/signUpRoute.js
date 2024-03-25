import express from "express";
import { userSignUp, userLogin, anyOneLoggedIn, userLogOut } from "../controller/loginSignup.js";

const signLogRouter = express.Router();

signLogRouter.post("/signup", userSignUp);
signLogRouter.post("/login", anyOneLoggedIn, userLogin);
signLogRouter.post("/logout", userLogOut);

export default signLogRouter;
