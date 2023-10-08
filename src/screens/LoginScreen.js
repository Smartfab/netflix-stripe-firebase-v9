import React, { useState } from "react";
import SignupScreen from "./SignupScreen";
import "./LoginScreen.css";
import "./SignupScreen.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginScreen() {
	const [signIn, setSignIn] = useState(false);
	const submit = (data) => {
		console.log(data);
	};

	const schema = z.object({
		email: z.string().email(),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	});

	return (
		<div className="loginScreen">
			<div className="loginScreen__background">
				<div className="loginScreen__nav">
					<img
						className="loginScreen__logo"
						src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
						alt=""
					/>
					<button
						className="loginScreen__button"
						onClick={() => setSignIn(true)}
					>
						Sign In
					</button>
				</div>
				<div className="loginScreen__gradient" />
				{signIn ? (
					<SignupScreen />
				) : (
					<div className="loginScreen__body">
						<h1>Unlimited movies, TV shows, and more</h1>
						<p>Watch anywhere. Cancel anytime.</p>
						<p>
							Ready to watch? Enter your email to create or restart your
							membership.
						</p>
						<div className="loginScreen__input">
							<form onSubmit={handleSubmit(submit)}>
								<input
									type="email"
									placeholder="Email address"
									{...register("email")}
								/>
								{errors.email && <h6>{errors?.email.message}</h6>}
								<button
									className="loginScreen__getStarted"
									onClick={() => setSignIn(true)}
								>
									Get Started
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default LoginScreen;
