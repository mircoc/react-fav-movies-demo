import React from "react";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import ErrorPage from "../screens/Errors";
import DetailsScreen from "../screens/Details";
import MoviesScreen from "../screens/Movies";
import FavoritesScreen from "../screens/Favorites";
import RootScreen from "../screens/Root";
import Loading from "./Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootScreen />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: "",
            element: <Loading />,
            loader: async () => {
                return redirect("/movie");
              }
          },
        {
            path: "movie",
            element: <MoviesScreen />,
          },
        {
          path: "movie/:movieId",
          element: <DetailsScreen />,
        },
        {
            path: "favorite",
            element: <FavoritesScreen />,
          },
          process.env.REACT_APP_REDIRECT_PROD_BASE ? {
            path: "/react-fav-movies-demo",
            element: <Loading />,
            loader: async () => {
                return redirect("/movie");
              }
          } : {
            // actually not needed
            path: "/loading",
            element: <Loading />,
            loader: async () => {
                return redirect("/movie");
              }
          },
      ],
  }
], {
  basename: process.env.REACT_APP_BASEURL
});

export function Navigator() {
  return <RouterProvider router={router} />;
}
