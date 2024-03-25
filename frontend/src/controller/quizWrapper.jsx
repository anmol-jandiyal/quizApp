import { createContext, useState } from "react";

export const QuizContext = createContext(null);

export default function QuizWrapper({ children }) {
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState();

	return <QuizContext.Provider value={{ user: user, setUser: setUser, message: message, setMessage: setMessage }}>{children}</QuizContext.Provider>;
}
