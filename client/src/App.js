/*eslint no-unused-vars: "error"*/

import Total from "./components/Total";
import productsPackage from "./products.json";
import productsFavourites from "./productsFavourites.json";
import Basket from "./components/Basket";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
    const order = useSelector((state) => state.order);
    // eslint-disable-next-line no-unused-vars
    const [menu, setMenu] = useState(productsPackage);
    const [currentMenu, setCurrentMenu] = useState(productsFavourites);

    const handleMenu = (type) => {
        switch (type) {
                        case "Favourites":
                            setCurrentMenu(productsFavourites);
                            break;
                        case "Must Coffee":
                            setCurrentMenu(menu.slice(0, 24));
                            break;
                        case "Technical Electives":
                            setCurrentMenu(menu.slice(25, 30));
                            break;
                        case "Filtered Coffee":
                            setCurrentMenu(menu.slice(31, 35));
                            break;
                        case "Summer School":
                            setCurrentMenu(menu.slice(36, 42));
                            break;
                        case "Free Electives":
                            setCurrentMenu(menu.slice(43, 47));
                            break;
                        case "Appetizers":
                            setCurrentMenu(menu.slice(48, 53));
                            break;
                        case "Add Drop":
                            setCurrentMenu(menu.slice(53, 56));
                            break;
                        case "Offerings":
                            setCurrentMenu(menu.slice(57, 68));
                            break;
                        default:
                            return;
        }

        // setMenu(products2[type].fast);
    };
    return (
        <div className="bg-indigo-200 min-h-screen flex flex-wrap py-4">
            <div className="grid grid-cols-6 justify-items-center gap-2 h-54 sticky bg-indigo-200 top-0 z-50 w-full border-solid border-y-red-600/50 border-b-2 py-2">
                <div className="col-start-1 col-end-2 w-42">
                    <Logo />
                </div>
                <div className="col-start-3 col-end-5 w-30">
                    <Basket />
                </div>
                <div className="col-start-5 col-end-7 w-42 ">
                    <Total />
                </div>
                <div className="col-start-2 col-end-7 w-full">
                    <NavBar handleMenu={handleMenu} />
                </div>
            </div>
            <div className="flex flex-wrap content-start justify-evenly min-h-screen">
                <Menu menu={currentMenu} order={order} />
            </div>
        </div>
    );
}

export default App;
