import React, { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
import "./PlansScreen.css";
// import { getDoc } from "firebase/firestore";
import {
	onSnapshot,
	collection,
	query,
	where,
	getDocs,
	addDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
	const [products, setProducts] = useState([]);
	const user = useSelector(selectUser);
	const [subscription, setSubscription] = useState(null);
	useEffect(() => {
		async function fetchSubscription() {
			try {
				const subscriptionQuery = query(
					collection(db, "customers", user.uid, "subscriptions")
				);
				const querySnapshot = await getDocs(subscriptionQuery);
				querySnapshot.forEach(async (subscriptionDoc) => {
					setSubscription({
						role: subscriptionDoc.data().role,
						current_period_end:
							subscriptionDoc.data().current_period_end.seconds,
						current_period_start:
							subscriptionDoc.data().current_period_start.seconds,
					});
				});
			} catch (error) {
				console.log("Error fetching subscription:", error);
			}
		}
		fetchSubscription();
	}, []);
	useEffect(() => {
		async function fetchProducts() {
			try {
				const productsQuery = query(
					collection(db, "products"),
					where("active", "==", true)
				);
				const querySnapshot = await getDocs(productsQuery);
				const products = {};
				querySnapshot.forEach(async (productDoc) => {
					products[productDoc.id] = productDoc.data();
					const priceSnap = await getDocs(
						query(collection(db, "products", productDoc.id, "prices"))
					);
					priceSnap.docs.forEach((price) => {
						products[productDoc.id].prices = {
							priceId: price.id,
							priceData: price.data(),
						};
					});
					// console.log(doc.id, "=>", doc.data());
				});
				setProducts(products);
			} catch (error) {
				console.log("Error fetching products:", error);
			}
		}
		fetchProducts();
	}, []);
	console.log(products);
	console.log(subscription);

	//     const {} = useQuery([""], async()=>{
	// return Axios
	//     })
	const loadCheckout = async (priceId) => {
		const docRef = await addDoc(
			collection(db, "customers", user.uid, "checkout_sessions"),
			{
				price: priceId,
				success_url: window.location.origin,
				cancel_url: window.location.origin,
			}
		);
		//Wait for the CheckoutSession to get attached by the extension
		onSnapshot(docRef, async (snap) => {
			const { error, sessionId } = snap.data();
			if (error) {
				// Show an error to your customer and
				// inspect your Cloud Function logs in the Firebase console.
				alert(`An error occurred: ${error.message}`);
			}
			if (sessionId) {
				//We have a session, let's redirect to Checkout
				//Init Stripe
				const stripe = await loadStripe(
					"pk_test_51NgmeFLCNH0pIqkjCBSd0nzGUetOt1yH6dNM6wXxzAWkOC9AjC0mfEatKnSdQnivlhQPWDMrEbnP5DbaRvLCP47Q006xzeBu66"
				);
				stripe.redirectToCheckout({ sessionId });
			}
		});
	};
	return (
		<div className="plansScreen">
			{subscription && (
				<h3>
					Renewal date : {""}
					{new Date(
						subscription?.current_period_end * 1000
					).toLocaleDateString()}{" "}
				</h3>
			)}
			{Object.entries(products).map(([productId, productData], index) => {
				//TODO: add logic to check if user's subscription is active
				const isCurrentPackage = productData.name
					?.toLowerCase()
					.includes(subscription.role);
				return (
					<div key={productId} className="plansScreen__plan">
						<div className="plansScreen__info">
							<h3 key={index}>Netflix {productData.name}</h3>
							<h3 key={index}>{productData.description}</h3>
						</div>
						<button
							className={`${
								isCurrentPackage ? "current__package" : "plansScreen__btn"
							}`}
							onClick={() => {
								!isCurrentPackage && loadCheckout(productData.prices.priceId);
							}}
						>
							{isCurrentPackage ? "Current Package" : "Subscribe"}
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default PlansScreen;
