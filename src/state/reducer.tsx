import { FavMovieState, FavMovieAction, ActionTypes } from "./favmovie.types";
import { movieDetailsToMovie } from "./mapper";

export const favMovieReducer = (state: FavMovieState, action: FavMovieAction): FavMovieState => {
    switch (action.type) {
            case ActionTypes.LOAD_MOVIE_DETAILS_REQUEST:
                case ActionTypes.LOAD_MOVIES_REQUEST:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    loading: true,
                }
            };
        case ActionTypes.LOAD_MOVIES_SUCCESS:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    loading: false,
                    loaded: true,
                    error: false,
                    data: action.payload.data.reduce(
                        (acc, movie) => {
                            const id = movie.id;
                            acc[id] = movie;
                            return acc;
                        },
                        state.movies.data
                    ),
                    dataOrder: [ ...state.movies.dataOrder, ...action.payload.data.map(movie => movie.id)],
                    lastPageLoaded: action.payload.page,
                    morePagesAvailable: action.payload.morePages,
                }
            };
        case ActionTypes.SET_MOVIES_PAGE:
            return {
                ...state,
                movies: {
                    ...state.movies,
                    pageRequested: action.payload,
                }
            };
        case ActionTypes.LOAD_MOVIES_FAILURE:
            case ActionTypes.LOAD_MOVIE_DETAILS_FAILURE:
            return {
               ...state,
                movies: {
                    ...state.movies,
                    loading: false,
                    error: true,
                    lastErrorMessage: action.payload,
                }
            };
        case ActionTypes.ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    data: [...state.favorites.data, action.payload],
                }
            };
        case ActionTypes.LOAD_INITIAL_FAVORITES:
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    data: action.payload,
                    loaded: true,
                }
            };
        case ActionTypes.REMOVE_FROM_FAVORITES:
            return {
                ...state,
                favorites: {
                   ...state.favorites,
                    data: state.favorites.data.filter(id => id !== action.payload),
                }
            };
            case ActionTypes.LOAD_MOVIE_DETAILS_SUCCESS:
                return {
                    ...state,
                    movies: {
                        ...state.movies,
                        loading: false,
                        loaded: true,
                        error: false,
                        data: { ...state.movies.data, [action.payload.id]: movieDetailsToMovie(action.payload)},
                    }
                };
        default:
            return {
                ...state
            };
        }
    };
