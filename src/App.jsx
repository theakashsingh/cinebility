import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/home/Home";
import WishList from "./pages/wishlist/Wishlist";
import Favorites from "./pages/favorites/Favorites";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  checkOnlineMode,
  setLocalFavorites,
  setLocalWishlist,
} from "./redux/features/movieSlice";

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
  const [initialToastShown, setInitialToastShown] = useState(false);
  const isOnline = useSelector(state => state.movie.isOnline);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      dispatch(checkOnlineMode(navigator.onLine));
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    if (!initialToastShown && isOnline) {
      setInitialToastShown(true);
    } else if (isOnline) {
      toast.info("You are now in online mode.!");
    } else {
      toast.info("You are now in offline mode.");
    }
  }, [isOnline]);

  useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist"));
    const favoritesData = JSON.parse(localStorage.getItem("favorites"));
    if (wishlistData) {
      
      dispatch(setLocalWishlist(wishlistData));
    }
    if (favoritesData) {
      
      dispatch(setLocalFavorites(favoritesData));
    }
  }, []);

  return (
    <div className="app">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
