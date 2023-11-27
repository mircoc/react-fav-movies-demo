import React from "react";
import { MovieId } from "../state/favmovie.types";
import "./MovieListItem.css";
import { Link } from "react-router-dom";
import StarIcon from "./icons/StarIcon";
import { voteFormatter, releaseDateToYear } from "../state/mapper";

export type MovieListItemProps = {
  title: string;
  posterImageUrl: string;
  releaseDate: string;
  voteAvarage: number;
  movieId: MovieId;
};

export default function MovieListItem({
  title,
  posterImageUrl,
  releaseDate,
  voteAvarage,
  movieId,
}: MovieListItemProps) {
  return (
    <div className="col-3">
      <Link
        to={`/movie/${movieId}`}
        className={"card text-center movie-list-item"}
      >
        <div className="position-relative">
        <img src={posterImageUrl} className="card-img" alt="movie poster" />
        <div
          className={"card-img-overlay align-text-bottom overlay"}
        >
          <div className="cart-text rate position-absolute bottom-0 start-0"><StarIcon /> {voteFormatter(voteAvarage)}</div>
          <div className="cart-text release position-absolute bottom-0 end-0">{releaseDateToYear(releaseDate)}</div>
        </div>
        </div>
        <h6 className={"title"}>{title}</h6>
      </Link>
    </div>
  );
}
