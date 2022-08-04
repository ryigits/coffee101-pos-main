import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/Welcome";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            // this means that the user doens't have a userId and should see Welcome/Registration for now
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // this means the user is registered cause their browser DID have the right cookie and they should be seeing a logo
            ReactDOM.render(
                <img
                    src="https://images.unsplash.com/photo-1659424864086-468b4eaa57bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                    alt="logo"
                />,
                document.querySelector("main")
            );
        }
    });