import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DropDownMenu() {
    const [consoleLabel, setConsoleLabel] = useState("yuzyil");
    useEffect(() => {
        fetch("/api/endoftheday/last")
            .then((data) => data.json())
            .then((last) => {
                setConsoleLabel(last.location);
            });
    }, []);
    const onLogout = () => {
        fetch("/api/auth/logout", {
            method: "POST",
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.success) location.replace("/");
            });
    };

    return (
        <>
            <Dropdown label={consoleLabel} color="purple" size="lg">
                <Dropdown.Item>
                    <Link to="/recent-orders">Recent Orders</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to="/end-of-the-day">End of The Day</Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
            </Dropdown>
        </>
    );
}
