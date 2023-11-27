import React, { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList";
import { useFavMoviesContext } from "../state";
import { Movie } from "../state/api.types";

export default function FavoritesScreen() {
  const { state } = useFavMoviesContext();
  const [favoritesMovies, setFavoritesMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getFavoritesDetails = async () => {
      const movieToLoad = [];
      const loadedFavorites = state.favorites.data
        .map((favId) => {
          const movie = state.movies.data[favId];
          if (movie) {
            return movie;
          }
          movieToLoad.push(favId);
          return null;
        })
        .filter((movie) => movie !== null) as Movie[];

      setFavoritesMovies(loadedFavorites);
    };
    getFavoritesDetails();
  }, [state.favorites.data, state.movies.data]);

  return (
    <MoviesList
      data={favoritesMovies}
      error={false}
      loaded={state.favorites.loaded}
    />
  );
}
