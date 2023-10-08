import React from "react";
import "./ProfileScreen.css";
import Nav from "../Nav";
import PlansScreen from "./PlansScreen";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";

function ProfileScreen() {
	const user = useSelector(selectUser);
	return (
		<div style={{ color: "white" }} className="profileScreen">
			<Nav />
			<div className="profileScreen__body">
				<h1 className="profileScreen__title">Edit Profile</h1>
				<div className="profileScreen__info">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
						alt=""
					/>
					<div className="profileScreen__detail">
						<h2>{user.email}</h2>
						<div className="profileScreen__plans">
							<h2>Plans(Current Plan : premium)</h2>

							<PlansScreen />

							<button
								className="profileScreen__signOut"
								onClick={() => signOut(auth)}
							>
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
