import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import QuizWrapper from "./controller/quizWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<QuizWrapper>
		<App />
	</QuizWrapper>
);
