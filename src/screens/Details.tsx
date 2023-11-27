import { useParams } from "react-router-dom";
import { useFavMoviesContext } from "../state";
import FatalError from "../components/FatalError";
import React, { useEffect } from "react";
import { loadMovieDetails } from "../state/actions";
import { MovieId } from "../state/favmovie.types";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import { IMAGE_URI_PREFIX } from "../state/api.conf";

export default function DetailsScreen() {
  const { state, dispatch } = useFavMoviesContext();
  const urlParams = useParams();

  const movieId = Number(urlParams?.movieId);

  // const movie
  const movie = state.movies.data[movieId];

  useEffect(() => {
    async function loadMissingDetails(id: MovieId) {
      if (!movie) {
        await loadMovieDetails(dispatch, id);
      }
    }

    loadMissingDetails(movieId);
  }, [movieId, dispatch, movie]);

  if (!movieId) {
    return <FatalError errorMessage="Movie not found" />;
  }
  return state.movies.loading ? (
    <Loading />
  ) : state.movies.error ? (
    <FatalError
      errorMessage={state.movies.lastErrorMessage || "movie loading error"}
    />
  ) : !state.movies.data[movieId] ? (
    <FatalError errorMessage="movie not found" />
  ) : (
    <MovieDetail
      movieId={movieId}
      title={movie?.title}
      posterImageUrl={`${IMAGE_URI_PREFIX}${movie?.poster_path}`}
      releaseDate={movie?.release_date}
      voteAvarage={movie?.vote_average}
      overview={movie?.overview}
    />
  );
}
