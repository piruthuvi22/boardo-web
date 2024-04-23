import { createRoot } from "react-dom/client";
import "./index.css";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// project imports
import App from "./App";
import { store } from "./store";

// style + assets
import "./assets/scss/style.scss";

// ==============================|| REACT DOM RENDER  ||============================== //

const container: any = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>
);
