
import React, { useEffect } from "react";
import { useFavMoviesContext } from "../state";
import {
  loadMoviesPage,
  loadNextPage,
} from "../state/actions";
import { MoviesListPage } from "../state/favmovie.types";
import MoviesList from "../components/MoviesList";
import { errorToMessage } from "../state/mapper";


export default function MoviesScreen() {
  const { state, dispatch } = useFavMoviesContext();

  useEffect(() => {
    const loadMovies = async (page: MoviesListPage) => {
      await loadMoviesPage(dispatch, state, page);
    };
    loadMovies(state.movies.pageRequested);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.movies.pageRequested, dispatch]);

  return (
    <MoviesList
      data={state.movies.dataOrder.map((movieId) => state.movies.data[movieId])}
      error={state.movies.error}
      loaded={state.movies.loaded}
      errorText={errorToMessage(state.movies.lastErrorMessage)}
      enableLoadMore={true}
      loadMore={() => loadNextPage(dispatch, state)}
      loading={state.movies.loading}
      morePages={state.movies.morePagesAvailable}
    />
  );
}
