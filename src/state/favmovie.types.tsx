import { AxiosError } from "axios";
import { Movie, MovieDetails } from "./api.types";

export type ApiErrorType = string | Error | AxiosError;

export type MovieId = Movie["id"];

export type MovieLoadingError = ApiErrorType;

export type MoviesListPage = number;

export type FavMovieState = {
  movies: {
    data: { [key: MovieId]: Movie };
    dataOrder: MovieId[];
    loaded: boolean;
    loading: boolean;
    error: boolean;
    lastErrorMessage?: MovieLoadingError;
    lastPageLoaded?: MoviesListPage;
    morePagesAvailable?: boolean;
    pageRequested: MoviesListPage;
  };
  favorites: {
    data: MovieId[];
    loaded: boolean;
  };
};

export enum ActionTypes {
  LOAD_MOVIES_REQUEST = "LOAD_MOVIES_REQUEST",
  SET_MOVIES_PAGE = "SET_MOVIES_PAGE",
  LOAD_MOVIES_SUCCESS = "LOAD_MOVIES_SUCCESS",
  LOAD_MOVIES_FAILURE = "LOAD_MOVIES_FAILURE",
  LOAD_MOVIE_DETAILS_REQUEST = "LOAD_MOVIE_DETAILS_REQUEST",
  LOAD_MOVIE_DETAILS_SUCCESS = "LOAD_MOVIE_DETAILS_SUCCESS",
  LOAD_MOVIE_DETAILS_FAILURE = "LOAD_MOVIE_DETAILS_FAILURE",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES",
  LOAD_INITIAL_FAVORITES = "LOAD_INITIAL_FAVORITES",
}

export type FavMovieAction =
  | { type: ActionTypes.LOAD_MOVIES_REQUEST }
  | {
      type: ActionTypes.LOAD_MOVIES_SUCCESS;
      payload: { data: Movie[]; page: MoviesListPage; morePages: boolean };
    }
  | { type: ActionTypes.SET_MOVIES_PAGE; payload: MoviesListPage }
  | { type: ActionTypes.LOAD_MOVIES_FAILURE; payload: MovieLoadingError }
  | { type: ActionTypes.LOAD_MOVIE_DETAILS_REQUEST, payload: MovieId }
  | { type: ActionTypes.LOAD_MOVIE_DETAILS_SUCCESS, payload: MovieDetails }
  | { type: ActionTypes.LOAD_MOVIE_DETAILS_FAILURE, payload: MovieLoadingError }
  | { type: ActionTypes.ADD_TO_FAVORITES; payload: MovieId }
  | { type: ActionTypes.REMOVE_FROM_FAVORITES; payload: MovieId }
  | { type: ActionTypes.LOAD_INITIAL_FAVORITES; payload: MovieId[] };

export type FavMovieContextType = {
  state: FavMovieState;

  dispatch: React.Dispatch<FavMovieAction>;
};
