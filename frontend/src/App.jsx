import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./component/pages/loginSign/signup";
import Login from "./component/pages/loginSign/login";
import TopicPage from "./component/pages/profilePages/topicpage";
import ProfileNavBar from "./component/pages/profilePages/profileNavBar";
import ScorePage from "./component/pages/profilePages/scores";
import QuizQuestion from "./component/pages/profilePages/question";
import QuizPage from "./component/pages/profilePages/quizPage";
import SolutionPage from "./component/pages/profilePages/solutionPage";
import QuestionAdditionPage from "./component/pages/profilePages/questionAdditionPage";
import HomePage from "./component/pages/loginSign/homePage";

const route = [
	{
		path: "/",
		element: (
			<div>
				<HomePage />
			</div>
		),
		children: [
			{
				path: "signup",
				element: <SignUp />,
			},
			{
				path: "login",
				element: <Login />,
			},
		],
	},
	{
		path: "/profile",
		element: (
			<div>
				<ProfileNavBar />
				<Outlet />
			</div>
		),
		children: [
			{
				path: "topic-page",
				element: <TopicPage />,
			},
			{
				path: "score-page",
				element: <ScorePage />,
			},
			{
				path: "addNewQuestions",
				element: <QuestionAdditionPage />,
			},
			{
				path: "admin-needed",
				element: <h4 style={{ color: "red", textAlign: "center" }}>**ADMIN PRIVILEGE NEEDED**</h4>,
			},
		],
	},
	{
		path: "quiz/:topic",
		element: (
			<>
				<ProfileNavBar />
				<QuizPage />
			</>
		),

		children: [
			{
				path: "attempt",
				element: <QuizQuestion />,
			},
			{
				path: "solution",
				element: (
					<>
						<SolutionPage />
					</>
				),
			},
		],
	},
];

const router = createBrowserRouter(route);

export default function App() {
	return <RouterProvider router={router}></RouterProvider>;
}
