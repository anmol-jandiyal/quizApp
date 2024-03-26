import express from "express";
import { userSignUp, userLogin, anyOneLoggedIn } from "../controller/loginSignup.js";

const signLogRouter = express.Router();

signLogRouter.post("/signup", userSignUp);
signLogRouter.post("/login", anyOneLoggedIn, userLogin);

export default signLogRouter;
