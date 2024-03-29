import { createRoot } from "react-dom/client";
import App from "./App";
import Admin from "./Admin";
import Dashboard from "./Dashboard/Dashboard";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import Login from "./Login";
// import EywinDashboard from "./Eywin/EywinDashboard";




const main = document.querySelector("main");
const root = createRoot(main);

fetch("/api/auth/user/id.json")
    .then((data) => data.json())
    .then((data) => {
        if (!data.id) {
            root.render(<Login />);
        } else if (data.isAdmin) {
            root.render(<Admin />);
        } else if (data.dashboard) {
            root.render(<Dashboard musteri={data.id} />);
        } else {
            root.render(
                <Provider store={store}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </Provider>
            );
        }
    });
