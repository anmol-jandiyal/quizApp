import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { QuizContext } from "../../../controller/quizWrapper";
import { useContext } from "react";

function activeFun({ isActive }) {
	console.log(isActive);
	return isActive ? "active" : "";
}

const BASEURL = import.meta.env.VITE_BACKEND_URL;

async function logoutFun(navigate, setUser) {
	setUser(null);
	navigate("/login");
}

export default function ProfileNavBar() {
	const { user, setUser } = useContext(QuizContext);

	const navigate = useNavigate();

	return (
		<div className="profileNavBar">
			<NavLink to="/profile/topic-page" className={`tab ${activeFun}`}>
				Topic
			</NavLink>
			<NavLink to="/profile/score-page" className={`tab ${activeFun}`}>
				Scores
			</NavLink>

			<NavLink to={user?.privilege === "admin" ? "/profile/addNewQuestions" : "/profile/admin-needed"} className={`tab ${activeFun}`}>
				Add Questions
			</NavLink>
			<button
				onClick={() => {
					if (confirm("Do you want to loggout?")) {
						setUser(null);
						logoutFun(navigate, setUser);
					}
				}}>
				LogOut
			</button>
		</div>
	);
}
