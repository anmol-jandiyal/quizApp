import axios from "axios";
import { useContext, useReducer } from "react";
import { QuizContext } from "../../../controller/quizWrapper";
import { useNavigate } from "react-router-dom";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

async function submitHandler(loginData, setUser, setMessage, navigate) {
	try {
		const res = await axios.post(BASEURL + "users/login", loginData, { withCredentials: true });

		setUser(res.data.user);

		navigate("/profile");
	} catch (err) {
		console.log(err);
		setMessage(err?.response?.data?.error);
	}
}

const initialLogin = { userName: "", password: "" };

function reducer(state, action) {
	switch (action.type) {
		case "CHANGE_USER_NAME":
			return { ...state, userName: action.payload };

		case "CHANGE_PASSWORD":
			return { ...state, password: action.payload };

		default:
			return state;
	}
}

export default function Login() {
	const navigate = useNavigate();
	const { setMessage, setUser } = useContext(QuizContext);
	const [loginData, dispatchLoginData] = useReducer(reducer, initialLogin);

	return (
		<div>
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();
					submitHandler(loginData, setUser, setMessage, navigate);
				}}>
				<input
					type="text"
					placeholder="User Name"
					onChange={(e) => {
						dispatchLoginData({ type: "CHANGE_USER_NAME", payload: e.target.value });
					}}
				/>
				<input
					type="text"
					placeholder="Password"
					onChange={(e) => {
						dispatchLoginData({ type: "CHANGE_PASSWORD", payload: e.target.value });
					}}
				/>
				<button>Submit</button>
			</form>
		</div>
	);
}
