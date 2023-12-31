import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios";
const Row = ({ title, fetchUrl, isLargeRow = false }) => {
	const [movies, setMovies] = useState([]);
	const base_url = "https://image.tmdb.org/t/p/original/";
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);
	// console.log(movies);

	return (
		<div className="row">
			<div className="row__contents">
				<h2 className="row__title">{title}</h2>
				<div className="row__posters">
					{movies?.map(
						(movie) =>
							((isLargeRow && movie.poster_path) ||
								(!isLargeRow && movie.backdrop_path)) && (
								<img
									key={movie.id}
									className={`row__poster ${isLargeRow && "row__posterLarge"}`}
									src={`${base_url}${
										isLargeRow ? movie.poster_path : movie.backdrop_path
									}`}
									alt={movie.name}
								/>
							)
					)}
				</div>
			</div>
		</div>
	);
};

export default Row;
