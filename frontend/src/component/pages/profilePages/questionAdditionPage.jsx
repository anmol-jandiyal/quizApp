import { useCallback, useReducer } from "react";
import { addQuestionToDB } from "../../../controller/DB_RELATED_FUN";

function reducer(state, action) {
	switch (action.type) {
		case "TOPIC_CHANGE":
			return { ...state, topic: action.payload };
		case "QUESTIONBANK_CHANGE":
			return { ...state, questionBank: [...state.questionBank, action.payload] };

		default:
			return state;
	}
}

function reducerQuestion(state, action) {
	switch (action.type) {
		case "QUESTION_CHANGE":
			return { ...state, question: action.payload };
		case "OPTION_A":
			return { ...state, options: { ...state.options, a: action.payload } };
		case "OPTION_B":
			return { ...state, options: { ...state.options, b: action.payload } };
		case "OPTION_C":
			return { ...state, options: { ...state.options, c: action.payload } };
		case "OPTION_D":
			return { ...state, options: { ...state.options, d: action.payload } };
		case "ANS_CHANGE":
			return { ...state, ans: action.payload };
		case "INITIAL_STATE":
			return { ...action.payload };
		default:
			return state;
	}
}

const initialQuestionState = { question: "", options: { a: "", b: "", c: "", d: "" }, ans: "" };

export default function QuestionAdditionPage() {
	const [formData, dispatcher] = useReducer(reducer, { topic: "", questionBank: [] });
	const [question, dispatcherQuestion] = useReducer(reducerQuestion, initialQuestionState);

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault();
			addQuestionToDB(formData);
		},
		[formData]
	);

	const addHandler = useCallback(
		(e) => {
			e.preventDefault();
			if (question.question && question.ans && question.options.a && question.options.b && question.options.c && question.options.d) {
				dispatcherQuestion({ type: "INITIAL_STATE", payload: initialQuestionState });
				dispatcher({ type: "QUESTIONBANK_CHANGE", payload: question });
			} else {
				alert("Please enter each input");
			}
		},
		[question]
	);

	return (
		<div>
			<form
				className="TOPIC-FORM"
				onSubmit={(e) => {
					e.preventDefault();
					if (!formData.topic) {
						alert("Topic field cannot be empty");
						return;
					}
					e.target.classList.add("hidden");
					document.querySelector(".QUESTION-FORM").classList.remove("hidden");
				}}>
				<input
					type="text"
					placeholder="Topic"
					onChange={(e) => {
						dispatcher({ type: "TOPIC_CHANGE", payload: e.target.value });
					}}
				/>

				<button>Add Questions</button>
			</form>

			<form className="hidden QUESTION-FORM">
				<input
					required
					type="text"
					placeholder="Question"
					value={question.question}
					onChange={(e) => {
						dispatcherQuestion({ type: "QUESTION_CHANGE", payload: e.target.value });
					}}
				/>
				<input
					required
					type="text"
					placeholder="Option A"
					value={question.options.a}
					onChange={(e) => {
						dispatcherQuestion({ type: "OPTION_A", payload: e.target.value });
					}}
				/>
				<input
					required
					type="text"
					placeholder="Option B"
					value={question.options.b}
					onChange={(e) => {
						dispatcherQuestion({ type: "OPTION_B", payload: e.target.value });
					}}
				/>
				<input
					required
					type="text"
					placeholder="Option C"
					value={question.options.c}
					onChange={(e) => {
						dispatcherQuestion({ type: "OPTION_C", payload: e.target.value });
					}}
				/>
				<input
					required
					type="text"
					placeholder="Option D"
					value={question.options.d}
					onChange={(e) => {
						dispatcherQuestion({ type: "OPTION_D", payload: e.target.value });
					}}
				/>
				<fieldset>
					<legend>ANS</legend>
					<label htmlFor="a">
						<input
							required
							id="a"
							type="radio"
							value="a"
							name="ans"
							onChange={(e) => {
								dispatcherQuestion({ type: "ANS_CHANGE", payload: e.target.value });
							}}
						/>
						A
					</label>

					<label htmlFor="b">
						<input
							id="b"
							type="radio"
							value="b"
							name="ans"
							onChange={(e) => {
								dispatcherQuestion({ type: "ANS_CHANGE", payload: e.target.value });
							}}
						/>
						B
					</label>

					<label htmlFor="c">
						<input
							id="c"
							type="radio"
							value="c"
							name="ans"
							onChange={(e) => {
								dispatcherQuestion({ type: "ANS_CHANGE", payload: e.target.value });
							}}
						/>
						C
					</label>

					<label htmlFor="d">
						<input
							id="d"
							type="radio"
							value="d"
							name="ans"
							onChange={(e) => {
								dispatcherQuestion({ type: "ANS_CHANGE", payload: e.target.value });
							}}
						/>
						D
					</label>
				</fieldset>

				<button onClick={submitHandler}>SUBMIT</button>
				<button onClick={addHandler}>ADD</button>
			</form>
		</div>
	);
}
