import { useOutletContext } from "react-router-dom";

export default function SolutionPage() {
	const [questionBank] = useOutletContext();

	return (
		<div>
			{questionBank.map((ele, index) => {
				return (
					<div key={index} className="solutionQuestionDiv">
						<h2>{ele.question}</h2>

						<div className="optionDiv">
							<label htmlFor={index + "a"} className={ele.ans === "a" ? "correctAnswer" : ""}>
								<input required type="radio" disabled id={index + "a"} name={"question" + index} />
								{questionBank[index].options.a}
							</label>

							<label htmlFor={index + "b"} className={ele.ans === "b" ? "correctAnswer" : ""}>
								<input type="radio" disabled id={index + "b"} name={"question" + index} />
								{ele.options.b}
							</label>

							<label htmlFor={index + "c"} className={ele.ans === "c" ? "correctAnswer" : ""}>
								<input type="radio" disabled id={index + "c"} name={"question" + index} />
								{ele.options.c}
							</label>

							<label htmlFor={index + "d"} className={ele.ans === "d" ? "correctAnswer" : ""}>
								<input type="radio" disabled id={index + "d"} name={"question" + index} />
								{ele.options.d}
							</label>
						</div>

						<hr />
					</div>
				);
			})}
		</div>
	);
}
