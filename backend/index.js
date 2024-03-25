import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import signLogRouter from "./routes/signUpRoute.js";
import questionBankRouter from "./routes/quizRoute.js";
import scoreRoute from "./routes/scoreRoute.js";

const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;

const server = express();
server.use(cookieParser());
server.use(express.json());
server.use(cors({ credentials: true, origin: true }));
server.use("/users", signLogRouter);
server.use("/questionbank", questionBankRouter);
server.use("/scores", scoreRoute);

mongoose
	.connect(URL)
	.then(() => {
		console.log("CONNECTION WITH DB ESTABLISHED");
		server.listen(PORT);
		console.log("SERVER STARTED");
	})
	.catch((err) => {
		console.log(err);
	});
