import { Button } from "flowbite-react";
export default function NavBar({ handleMenu }) {
    return (
        <>
            <Button.Group>
                <Button
                    color="gray"
                    onClick={() => handleMenu("Favourites")}
                >
                    Favourites
                </Button>
                <Button color="gray" onClick={() => handleMenu("Must Coffee")}>
                    Must Coffee
                </Button>
                <Button
                    color="gray"
                    onClick={() => handleMenu("Technical Electives")}
                >
                    Technical Electives
                </Button>
                <Button
                    color="gray"
                    onClick={() => handleMenu("Filtered Coffee")}
                >
                    Filtered Coffee
                </Button>
                <Button
                    color="gray"
                    onClick={() => handleMenu("Summer School")}
                >
                    Summer School
                </Button>
                <Button
                    color="gray"
                    onClick={() => handleMenu("Free Electives")}
                >
                    Free Electives
                </Button>
                <Button color="gray" onClick={() => handleMenu("Appetizers")}>
                    Appetizers
                </Button>
                <Button color="gray" onClick={() => handleMenu("Add Drop")}>
                    Add Drop
                </Button>
                <Button color="gray" onClick={() => handleMenu("Offerings")}>
                    Offerings
                </Button>
            </Button.Group>
        </>
    );
}
