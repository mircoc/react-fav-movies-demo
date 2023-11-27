import React from "react";
import { MovieId } from "../state/favmovie.types";
import { useFavMoviesContext } from "../state";
import "./MovieDetail.css";
import { releaseDatePretty, voteFormatter } from "../state/mapper";
import StarIcon from "./icons/StarIcon";
import CalendarIcon from "./icons/CalendarIcon";
import { addToFavorites, removeFromFavorites } from "../state/actions";

export type MovieDetailProps = {
  title: string;
  posterImageUrl: string;
  releaseDate: string;
  voteAvarage: number;
  movieId: MovieId;
  overview: string;
};

export default function MovieDetail({
  movieId,
  overview,
  posterImageUrl,
  releaseDate,
  title,
  voteAvarage,
}: MovieDetailProps) {
  const { state, dispatch } = useFavMoviesContext();
  const isFavorited = state.favorites.data.indexOf(movieId) !== -1;
  return (
    <div className="container text-center movie-detail">
      <div className="row align-items-center">
        <div className="col-4">
          <img src={posterImageUrl} className="card-img" alt="movie poster" />
        </div>
        <div className="col-8 text-start">
          <h3>{title}</h3>
          <div className="text-warning"><StarIcon /> <strong className="vote">{voteFormatter(voteAvarage)}</strong> <CalendarIcon /> <strong className="release">{releaseDatePretty(releaseDate)}</strong></div>
          <div className="movie-overview-text">{overview}</div>
          {!isFavorited && <button type="button" className="btn btn-warning" onClick={() => addToFavorites(dispatch, state, movieId)}>Add To Favorites</button>}
          {isFavorited && <button type="button" className="btn btn-danger" onClick={() => removeFromFavorites(dispatch, state, movieId)}>Remove From Favorites</button>}
        </div>
      </div>
    </div>
  );
}
