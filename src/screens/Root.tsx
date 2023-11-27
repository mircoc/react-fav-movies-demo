import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import { useEffect } from "react";
import { loadInitialFavorites } from "../state/actions";
import { useFavMoviesContext } from "../state";

export default function RootScreen() {
  const { dispatch } = useFavMoviesContext();
  useEffect(() => {
        const bootstrap = async () => {
          await loadInitialFavorites(dispatch);
        };
        bootstrap();
      }, [dispatch]);
      
    return (
        <div className="container">
            <NavBar />
            <Outlet />
      </div>
    );
}