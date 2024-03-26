import expess from "express";
import { restrictToLoggedUser } from "../controller/loginSignup.js";
import { getScores, addScores } from "../controller/scores.js";
const scoreRoute = expess.Router();

scoreRoute.get("/:uid", restrictToLoggedUser, getScores);
scoreRoute.post("/", restrictToLoggedUser, addScores);

export default scoreRoute;
