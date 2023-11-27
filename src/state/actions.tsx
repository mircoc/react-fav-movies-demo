import axios from "axios";
import {
  ActionTypes,
  FavMovieAction,
  FavMovieState,
  MovieId,
  MoviesListPage,
} from "./favmovie.types";
import { MovieDetails, MovieList } from "./api.types";
import { THEMOVIEDB_APIKEY } from "./api.conf";

const LOCALSTORAGE_FAV_KEY = "favmovies";

export async function loadMoviesPage(
  dispatch: React.Dispatch<FavMovieAction>,
  state: FavMovieState,
  nextPage: MoviesListPage
) {
  if (state.movies.morePagesAvailable === false) {
    // we know that data pagination is finished
    console.log("no more pages available...");
    return;
  }
  dispatch({ type: ActionTypes.LOAD_MOVIES_REQUEST });
  const getMovies = async (page: MoviesListPage) => {
    const genericError = "[getMovies] Generic error from remote endpoint";
    try {
      const response = await axios.get<MovieList>(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${THEMOVIEDB_APIKEY}&page=${page}`
      );
      if (response.status === 200) {
        dispatch({
          type: ActionTypes.LOAD_MOVIES_SUCCESS,
          payload: {
            data: response.data.results,
            page: response.data.page,
            morePages: response.data.page <= response.data.total_pages,
          },
        });
        return;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.status);
        console.error(err.response);
        dispatch({
          type: ActionTypes.LOAD_MOVIES_FAILURE,
          payload: err.response?.data || genericError,
        });
      } else {
        console.error(err);
        dispatch({
          type: ActionTypes.LOAD_MOVIES_FAILURE,
          payload: genericError,
        });
      }
    }
  };

  getMovies(nextPage);
}

export async function loadMovieDetails(
  dispatch: React.Dispatch<FavMovieAction>,
  movieId: MovieId
) {
  if (!movieId) {
    return;
  }
  dispatch({ type: ActionTypes.LOAD_MOVIE_DETAILS_REQUEST, payload: movieId });
  const getMovieDetails = async (movieId: MovieId) => {
    const genericError = "[getMovies] Generic error from remote endpoint";
    try {
      const response = await axios.get<MovieDetails>(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${THEMOVIEDB_APIKEY}`
      );
      if (response.status === 200) {
        dispatch({
          type: ActionTypes.LOAD_MOVIE_DETAILS_SUCCESS,
          payload: response.data,
        });
        return;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error", err);
        dispatch({
          type: ActionTypes.LOAD_MOVIE_DETAILS_FAILURE,
          payload: err || genericError,
        });
      } else {
        console.error(err);
        dispatch({
          type: ActionTypes.LOAD_MOVIE_DETAILS_FAILURE,
          payload: genericError,
        });
      }
    }
  };

  getMovieDetails(movieId);
}

export async function loadNextPage(
  dispatch: React.Dispatch<FavMovieAction>,
  state: FavMovieState
) {
  const currentPage = state.movies.lastPageLoaded || 0;
  dispatch({ type: ActionTypes.SET_MOVIES_PAGE, payload: currentPage + 1 });
}

export async function loadInitialFavorites(
  dispatch: React.Dispatch<FavMovieAction>
) {
  try {
    const jsonValue = localStorage.getItem(LOCALSTORAGE_FAV_KEY);
    const favorites: MovieId[] = jsonValue != null ? JSON.parse(jsonValue) : [];

    dispatch({ type: ActionTypes.LOAD_INITIAL_FAVORITES, payload: favorites });
  } catch (err) {
    console.error(err);
  }
}

export async function addToFavorites(
  dispatch: React.Dispatch<FavMovieAction>,
  state: FavMovieState,
  movieId: MovieId
) {
  try {
    const favorites: MovieId[] = state.favorites.loaded
      ? [...state.favorites.data, movieId]
      : [movieId];
    localStorage.setItem(LOCALSTORAGE_FAV_KEY, JSON.stringify(favorites));

    dispatch({ type: ActionTypes.ADD_TO_FAVORITES, payload: movieId });
  } catch (err) {
    console.error(err);
  }
}

export async function removeFromFavorites(
  dispatch: React.Dispatch<FavMovieAction>,
  state: FavMovieState,
  movieId: MovieId
) {
  try {
    const favorites: MovieId[] = state.favorites.loaded
      ? state.favorites.data.filter((id) => id !== movieId)
      : [];
    localStorage.setItem(LOCALSTORAGE_FAV_KEY, JSON.stringify(favorites));

    dispatch({ type: ActionTypes.REMOVE_FROM_FAVORITES, payload: movieId });
  } catch (err) {
    console.error(err);
  }
}
