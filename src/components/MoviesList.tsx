import React from "react";
import { Movie } from "../state/api.types";
import MovieListItem from "./MovieListItem";
import { IMAGE_URI_PREFIX } from "../state/api.conf";
import "./MoviesList.css";
import Loading from "./Loading";

export type MovieListProps = {
  data: Movie[];
  error: boolean;
  loaded: boolean;
  errorText?: string;
  enableLoadMore?: boolean;
  loadMore?: () => void;
  loading?: boolean;
  morePages?: boolean;
};

export default function MoviesList({
  data,
  error,
  errorText,
  loaded,
  loadMore,
  loading,
  morePages,
  enableLoadMore,
}: MovieListProps) {
  return (
    <div className="container-md">
      <div className="row row-cols-4">
        {data.map((movie) => (
          <MovieListItem
            key={movie.id}
            title={movie.title}
            posterImageUrl={`${IMAGE_URI_PREFIX}${movie.poster_path}`}
            releaseDate={movie.release_date}
            movieId={movie.id}
            voteAvarage={movie.vote_average}
          />
        ))}
      </div>
      {loading && (
        <>
          <div className="row text-center pb-3">
            <div className="col loading">
              <Loading />
            </div>
          </div>
        </>
      )}
      {!loading && enableLoadMore && loadMore && (
        <>
          <div className="row text-center pb-3">
            <div className="col loadmore">
              <button className="btn btn-light" onClick={() => loadMore()}>
                Load More
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
