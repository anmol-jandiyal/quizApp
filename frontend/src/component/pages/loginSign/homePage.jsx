import { Outlet } from "react-router-dom";
import NavBar from "./navBar";
import Message from "./message";

export default function HomePage() {
	return (
		<div className="homePage">
			<div>
				<NavBar />
				<Outlet />
				<Message />
			</div>
		</div>
	);
}
