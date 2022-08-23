import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
export default function DropDownMenu() {
    return (
        <>
            <Dropdown label="Console" color="purple" size="lg">
                <Dropdown.Item>
                    <Link to="/recent-orders">Recent Orders</Link>
                </Dropdown.Item>
                <Dropdown.Item>End of The Day</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
        </>
    );
}
