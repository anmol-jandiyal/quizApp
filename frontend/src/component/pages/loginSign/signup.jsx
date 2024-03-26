import { useContext, useReducer } from "react";
import { QuizContext } from "../../../controller/quizWrapper";
import { addUserToDB } from "../../../controller/DB_RELATED_FUN";
import { useNavigate } from "react-router-dom";

async function submitHandler(e, signUpData, setMessage, navigate) {
	e.preventDefault();

	if (signUpData.password < 8) {
		alert("Password length must be greater than 8");
		return;
	}

	if (signUpData.userName && signUpData.password === signUpData.confirmPassword && signUpData.name) {
		const newEntry = { ...signUpData };
		delete newEntry.confirmPassword;

		addUserToDB(newEntry, setMessage);
		navigate("/login");
	}
}

const initialState = { password: "", confirmPassword: "", name: "", email: "", mismatchStyle: "", privilege: "non-admin" };

function reducer(state, action) {
	state.mismatchClass = "";

	switch (action.type) {
		case "CHANGE_NAME":
			return { ...state, name: action.payload };

		case "CHANGE_USERNAME":
			return { ...state, userName: action.payload };

		case "CHANGE_PASSWORD":
			return { ...state, password: action.payload };

		case "CHANGE_CONF_PASSWORD":
			if (state.password !== action.payload) {
				return { ...state, confirmPassword: action.payload, mismatchClass: "wrongPassword" };
			} else {
				return { ...state, confirmPassword: action.payload };
			}
		case "CHANGE_PRIVILEGE":
			return { ...state, privilege: action.payload };

		default:
			return state;
	}
}

export default function SignUp() {
	const navigate = useNavigate();
	const { setMessage } = useContext(QuizContext);

	const [signUpData, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<form
				action=""
				onSubmit={(e) => {
					submitHandler(e, signUpData, setMessage, navigate);
				}}>
				<input
					type="text"
					placeholder="Name"
					onChange={(e) => {
						dispatch({ type: "CHANGE_NAME", payload: e.target.value });
					}}
				/>

				<input
					type="text"
					placeholder="User Name"
					onChange={(e) => {
						dispatch({ type: "CHANGE_USERNAME", payload: e.target.value });
					}}
				/>

				<input
					type="text"
					placeholder="Password"
					onChange={(e) => {
						dispatch({ type: "CHANGE_PASSWORD", payload: e.target.value });
					}}
				/>
				<input
					type="text"
					placeholder="confirmPassword"
					name="confirmPassword"
					className={signUpData.mismatchClass}
					onChange={(e) => {
						dispatch({ type: "CHANGE_CONF_PASSWORD", payload: e.target.value });
					}}
				/>
				<select
					name="privilege"
					id="privilege"
					onChange={(e) => {
						dispatch({ type: "CHANGE_PRIVILEGE", payload: e.target.value });
					}}>
					<option value="non-admin">Non-Admin</option>
					<option value="admin">Admin</option>
				</select>
				<button>Submit</button>
			</form>
		</div>
	);
}
