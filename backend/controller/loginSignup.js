import User from "../models/users.js";
import { setUser, getUser } from "./auth.js";
import bcrypt from "bcrypt";

//<-------------TO ADD NEW USER TO THE USER DATABASE-------------->
async function userSignUp(req, res) {
	const userData = req.body;

	const newUser = new User(userData);

	newUser
		.save()
		.then((doc) => {
			return res.status(201).json({ message: "Successful Addition", doc: doc });
		})
		.catch((error) => {
			if (error.code === 11000) {
				return res.status(409).json({ error: "Same userName already present" });
			} else if (error.name === "ValidationError") {
				return res.status(400).json(error);
			}

			return res.status(500).json({ error: "Internal server error" });
		});
}

//<-------------LOGIN TO THE USER PROFILE (TO GET ACCESS OF BOOKS HE/SHE BORROWED)-------------->
async function userLogin(req, res) {
	const loginData = req.body;

	//checking if userName and password present in the body or not
	if (loginData.userName && loginData.password) {
		try {
			const userDoc = await User.findOne({ userName: loginData.userName });

			if (userDoc) {
				const validateBool = await bcrypt.compare(loginData.password, userDoc.password);

				if (validateBool) {
					const token = setUser(userDoc);

					return res.status(200).json({ user: { userName: userDoc.userName, privilege: userDoc.privilege, uid: token }, message: "successful login" });
				}
				return res.status(401).json({ error: "Invalid password" });
			} else {
				return res.status(404).json({ error: "user not found" });
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({ error: error });
		}
	} else {
		return res.status(400).json({ error: "Invalid request", message: "Request must contain userName and password " });
	}
}

//<-------------LOG OUT -------------->
/* 
function userLogOut(req, res) {
	const uid = req.body.uid;

	if (uid) {
		res.clearCookie("uid");
		return res.status(200).json({ message: "successful loggout" });
	}

	res.status(400).json({ message: "Already logged out! No user have logged in" });
}
 */
//<-------------------------checking if any user is loggin  or not ------------------------------>
async function anyOneLoggedIn(req, res, next) {
	const uid = req.body.uid;

	if (uid) {
		//if uid exist then check if uid is associates to authentic  user or not
		const user = getUser(uid);

		// check if user is valid or not
		try {
			const userDoc = await User.findById(user._id);

			if (userDoc) {
				return res.status(409).json({ message: "Not able to login because other user already logged in" });
			}
		} catch (err) {
			return res.status(500).json({ error: err });
		}
	}
	next();
}

// <--------to restrict the services that are allowed to logged user only---------------------->
async function restrictToLoggedUser(req, res, next) {
	const uid = req.params.uid ?? req.body.uid;

	if (!uid) {
		//redirect the user to login to access the his/her profile
		return res.status(307).json({ message: "Please login before You access the quiz", redirect: "redirection to login page" });
	}

	//if uid exist then check if uid is associates to any user or not
	const user = getUser(uid);

	// check if user is valid or not
	try {
		const userDoc = await User.findById(user._id);

		if (!userDoc) {
			//redirect to login page
			return res.status(401).json({ message: "unauthorized access!  Please log in again.", code: "REDIRECTION_LOGIN_PAGE" });
		}
	} catch (err) {
		return res.status(500).json({ error: err });
	}

	next();
}

//<------------------to restrict admin to perform operations like adding new topic and questions -------------------------------------------->

async function authorized(req, res, next) {
	const uid = req.body.uid;

	const user = getUser(uid);

	try {
		const userDoc = await User.findById(user._id);

		if (userDoc && userDoc.privilege !== "admin") {
			return res.status(401).json({ message: "unauthorized access! ", code: "ADMIN_PRIVILEGE_NEEDED" });
		}
	} catch (err) {
		return res.status(500).json({ error: err });
	}
	next();
}
export { userLogin, userSignUp, anyOneLoggedIn, restrictToLoggedUser, authorized };
