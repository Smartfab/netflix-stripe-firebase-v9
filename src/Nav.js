import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Nav.css";
const Nav = () => {
	const navigateToProfile = useNavigate();
	const [showNav, setShowNav] = useState(false);
	const showNavigationBar = () => {
		if (window.scrollY > 100) {
			setShowNav(true);
		} else {
			setShowNav(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", showNavigationBar);
		return () => window.removeEventListener("scroll", showNavigationBar);
	}, []);

	return (
		<div className={`nav ${showNav && "nav__black"}`}>
			<div className="nav__contents">
				<img
					className="nav__logo"
					src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
					alt=""
					onClick={() => navigateToProfile("/")}
				/>
				<img
					className="nav__avatar"
					src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
					alt=""
					onClick={() => navigateToProfile("/profile")}
				/>
			</div>
		</div>
	);
};

export default Nav;
