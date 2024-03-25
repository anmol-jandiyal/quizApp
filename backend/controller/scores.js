import User from "../models/users.js";
import { getUser } from "./auth.js";

export async function getScores(req, res) {
	const uid = req.cookies.uid;
	const user = getUser(uid);

	try {
		const { scores } = await User.findOne({ userName: user.userName }, { scores: 1, _id: 0 });
		if (scores.length === 0) {
			return res.status(200).json({ Message: "No quiz has been taken", scores });
		}
		return res.status(200).json({ scores });
	} catch (err) {
		console.log(err);
		res.status(400).json({ Message: "bad request" });
	}
}
export async function addScores(req, res) {
	const uid = req.cookies.uid;
	const user = getUser(uid);
	const { topic, marks } = req.body;

	try {
		const updateData = await User.findOneAndUpdate(
			{ userName: user.userName },
			{ $push: { scores: { topic: topic, marks: marks, time: new Date() } } },
			{
				new: true,
			}
		);

		res.status(200).json({ scores: updateData });
	} catch (err) {
		console.log(err);
		res.status(400).json({ Message: "bad request", err });
	}
}
