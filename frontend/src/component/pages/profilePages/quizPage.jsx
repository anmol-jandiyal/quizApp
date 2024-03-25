import { useState, useEffect } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

export default function QuizPage() {
	const { topic } = useParams();
	const [questionBank, setQuestionBank] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(BASEURL + "questionbank/questions/" + topic, { withCredentials: true })
			.then((response) => {
				setQuestionBank(response.data.questions.questionBank);
				navigate("/quiz/" + topic + "/" + "attempt");
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className="quizPage">
			<h1 className="quizTopicName">{topic}</h1>
			<Outlet context={[questionBank, topic]} />
		</div>
	);
}
