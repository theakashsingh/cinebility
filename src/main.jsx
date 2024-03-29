import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <div className="unknown"></div>
    <Provider store={store}>
      <App />
    </Provider>
    <div className="unknown"></div>
  </>
);
