import React, { useContext } from "react";
import { QuizContext } from "../../../controller/quizWrapper";

export default function Message() {
	const { message } = useContext(QuizContext);
	return (
		<div className="message" style={{ color: "red", textAlign: "center" }}>
			{message}
		</div>
	);
}
