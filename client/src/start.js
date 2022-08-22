import { createRoot } from "react-dom/client";
import App from "./App";

const main = document.querySelector("main");
const root = createRoot(main);

root.render(
        <App />

);
