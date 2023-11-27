import React from "react";
import { Navigator } from "./components/Navigator";
import { FavMoviesProvider } from "./state";

function App() {
  return (
    <FavMoviesProvider>
      <Navigator />
    </FavMoviesProvider>
  );
}

export default App;
