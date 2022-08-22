import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
const main = document.querySelector("main");
const root = createRoot(main);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
