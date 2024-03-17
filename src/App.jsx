import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/home/Home";
import WishList from "./pages/wishlist/Wishlist";
import Favorites from "./pages/favorites/Favorites"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "wishlist",
        element: <WishList />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
