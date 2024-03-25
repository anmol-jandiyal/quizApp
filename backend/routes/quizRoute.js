import express from "express";
import { addQuestions, getQuestions, getTopics } from "../controller/quizQuestionFunction.js";
import { authorized, restrictToLoggedUser } from "../controller/loginSignup.js";
const questionBankRouter = express.Router();

questionBankRouter.post("/", authorized, addQuestions);

questionBankRouter.get("/topics", restrictToLoggedUser, getTopics);
questionBankRouter.get("/questions/:topic", restrictToLoggedUser, getQuestions);

export default questionBankRouter;
