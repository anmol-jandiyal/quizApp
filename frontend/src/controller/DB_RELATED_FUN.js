import axios from "axios";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

async function addUserToDB(user, setMessage) {
	try {
		const response = await axios.post(BASEURL + "users/signup", user);
		setMessage(response.data.message);
	} catch (err) {
		console.log(err);
		setMessage(err.response.data.error);
		console.log(err, "err");
	}
}

async function updateScoresInDB(marks, topic, user) {
	console.log(marks, topic);
	try {
		const response = await axios.post(BASEURL + "scores", { marks: marks, topic, time: new Date(), uid: user.uid }, { withCredentials: true });
	} catch (err) {
		console.log(err);
	}
}
async function addQuestionToDB(formData, user) {
	try {
		const response = await axios.post(BASEURL + "questionBank", { ...formData, uid: user.uid }, { withCredentials: true });
		console.log(response);
	} catch (err) {
		console.log("err", err);
	}
}

export { addUserToDB, updateScoresInDB, addQuestionToDB };
