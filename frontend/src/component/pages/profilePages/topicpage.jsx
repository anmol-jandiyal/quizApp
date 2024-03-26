import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../../controller/quizWrapper";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

export default function TopicPage() {
	const navigate = useNavigate();
	const [output, setOutput] = useState();
	const { user } = useContext(QuizContext);

	useEffect(() => {
		if (user)
			axios
				.get(BASEURL + "questionBank/topics", { withCredentials: true })
				.then((response) => {
					const topics = response.data.topics;
					setOutput(
						topics.map((topic, index) => {
							return (
								<div className="topicDiv" key={index}>
									<h3>{topic}</h3>
									<button
										onClick={(e) => {
											e.preventDefault();
											navigate("/quiz/" + topic);
										}}>
										Attempt
									</button>
								</div>
							);
						})
					);
				})
				.catch((err) => {
					console.log(err, "error");
				});
	}, []);

	return <div>{output}</div>;
}
