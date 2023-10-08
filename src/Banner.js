import React from "react";
import "./Banner.css";
import axios from "./axios";
import { useState, useEffect } from "react";
import requests from "./Request";

const Banner = () => {
	const [movie, setMovie] = useState([]);
	// const API_KEY = e96267672deb20576a024b419d0a79a4;

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
			setMovie(
				request.data.results[
					Math.floor(Math.random() * request.data.results.length - 1)
				]
			);
			return request;
		}
		fetchData();
	}, []);
	// console.log(movie);
	function truncate(string, n) {
		return string?.length > n ? string.substring(0, n - 1) + "..." : string;
	}
	return (
		<div>
			<header
				className="banner"
				style={{
					// backgroundSize: "100% 100%",
					// backgroundRepeat: "no-repeat",
					// backgroundPosition: "center center",
					backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
				}}
			>
				<div className="banner__contents">
					<h1 className="banner__title">
						{movie?.title || movie?.name || movie?.original_name}
					</h1>
					<div className="banner__buttons">
						<button className="banner__button">Play</button>
						<button className="banner__button">My List</button>
					</div>
					<h1 className="banner__description">
						{truncate(movie?.overview, 100)}
					</h1>
				</div>
				<div className="banner--fadeBottom" />
			</header>
		</div>
	);
};

export default Banner;
