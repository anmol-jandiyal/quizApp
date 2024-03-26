import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { QuizContext } from "../../../controller/quizWrapper";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

export default function ScorePage() {
	const [output, setOutput] = useState();
	const { user } = useContext(QuizContext);

	useEffect(() => {
		if (user)
			axios
				.get(BASEURL + "scores/", { withCredentials: true })
				.then((response) => {
					const scores = response.data.scores;
					if (scores.length === 0) {
						setOutput(
							<div>
								<h3 style={{ textAlign: "center", color: "red", margin: "30px" }}>Please give test to access the scores</h3>
								<p style={{ textAlign: "center", fontSize: "1rem", color: "gray" }}>Go to topic page from navigation and select any favorite topic</p>
							</div>
						);
						return;
					}

					setOutput(
						scores.map((element, index) => {
							return (
								<div className="scoresDiv" key={index}>
									<div className="main">
										<h3>{element.topic}</h3>
										<h4>{element.marks.obtain + "/" + element.marks.max}</h4>
									</div>
									<p style={{ color: "blue" }}>{new Date(element.time).toLocaleString()}</p>
								</div>
							);
						})
					);
				})
				.catch((err) => {
					console.log(err);
				});
	}, []);

	return <div>{output}</div>;
}
