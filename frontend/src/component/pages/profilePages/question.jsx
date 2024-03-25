import { useEffect, useReducer, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { updateScoresInDB } from "../../../controller/DB_RELATED_FUN";

function reducer(state, action) {
	return { ...action };
}
export default function QuizQuestion() {
	const [questionBank, topic] = useOutletContext();
	const [questionElement, setQuestionElement] = useState();
	const [index, setIndex] = useState(0);
	const [marks, dispatcher] = useReducer(reducer, { max: 0, obtain: 0 });

	const navigate = useNavigate();

	useEffect(() => {
		if (questionBank.length === 0) {
			return;
		}

		function onChangeHandler(optionSelected, e) {
			if (questionBank[index].ans === optionSelected) {
				e.target.closest(".option-label").classList.add("correctAnswer");
				dispatcher({ max: marks.max + 1, obtain: marks.obtain + 1 });
			} else {
				e.target.closest(".option-label").classList.add("wrongAnswer");
				dispatcher({ max: marks.max + 1, obtain: marks.obtain });
			}

			setTimeout(() => {
				if (index + 1 < questionBank.length) setIndex(index + 1);
				else {
					updateScoresInDB(marks, topic);
					navigate("/quiz/" + topic + "/" + "solution");
				}
			}, 200);
		}

		setQuestionElement(
			<div>
				<form
					className="questionForm"
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<div key={index}>
						<h2 style={{ margin: "10px" }}>{questionBank[index].question}</h2>

						<div className="optionDiv">
							<label htmlFor={index + "a"} className="option-label">
								<input
									required
									type="radio"
									value="a"
									id={index + "a"}
									name={"question" + index}
									onChange={(e) => {
										onChangeHandler("a", e);
									}}
								/>
								{questionBank[index].options.a}
							</label>

							<label htmlFor={index + "b"} className="option-label">
								<input
									type="radio"
									value="b"
									id={index + "b"}
									name={"question" + index}
									onChange={(e) => {
										onChangeHandler("b", e);
									}}
								/>
								{questionBank[index].options.b}
							</label>

							<label htmlFor={index + "c"} className="option-label">
								<input
									type="radio"
									value="c"
									id={index + "c"}
									name={"question" + index}
									onChange={(e) => {
										onChangeHandler("c", e);
									}}
								/>
								{questionBank[index].options.c}
							</label>

							<label htmlFor={index + "d"} className="option-label">
								<input
									type="radio"
									value="d"
									id={index + "d"}
									name={"question" + index}
									onChange={(e) => {
										onChangeHandler("d", e);
									}}
								/>
								{questionBank[index].options.d}
							</label>
						</div>
					</div>
				</form>
			</div>
		);
	}, [index]);

	return <div>{questionElement}</div>;
}
