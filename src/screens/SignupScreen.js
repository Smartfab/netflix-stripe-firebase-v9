import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

function SignupScreen() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	// const [] = useState()
	const register = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(
			auth,
			emailRef.current.value,
			passwordRef.current.value
		)
			.then((userCredential) => {
				console.log(userCredential);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(
			auth,
			emailRef.current.value,
			passwordRef.current.value
		)
			.then((authUser) => {
				console.log(authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	return (
		<div className="signupScreen">
			<form>
				<h1 className="signupScreen__title">Sign In</h1>

				<input
					ref={emailRef}
					type="email"
					className="signupScreen__input"
					placeholder="Email"
				/>

				<input
					ref={passwordRef}
					type="password"
					className="signupScreen__input"
					placeholder="Password"
				/>

				<button type="submit" onClick={signIn}>
					Sign In
				</button>
				<h4>
					New to Netflix? <span onClick={register}>Sign up now.</span>
				</h4>
			</form>
		</div>
	);
}

export default SignupScreen;
