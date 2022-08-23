import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
export default function DropDownMenu() {
    return (
        <>
            <Dropdown label="Console" color="purple" size="lg">
                <Dropdown.Item>
                    <Link to="/recent-orders">Recent Orders</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to="/end-of-the-day">End of The Day</Link>
                </Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
        </>
    );
}
