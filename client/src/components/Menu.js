import Product from "./Product";
import NavBar from "./NavBar";
import productsPackage from "../products.json";
import productsFavourites from "../productsFavourites.json";
import { useState } from "react";

export default function Menu({ order }) {
    const [menu, setMenu] = useState(productsFavourites);
    const handleMenu = (type) => {
        switch (type) {
                        case "Favourites":
                            setMenu(productsFavourites);
                            break;
                        case "Must Coffee":
                            setMenu(productsPackage.slice(0, 24));
                            break;
                        case "Technical Electives":
                            setMenu(productsPackage.slice(25, 30));
                            break;
                        case "Filtered Coffee":
                            setMenu(productsPackage.slice(31, 35));
                            break;
                        case "Summer School":
                            setMenu(productsPackage.slice(36, 42));
                            break;
                        case "Free Electives":
                            setMenu(productsPackage.slice(43, 47));
                            break;
                        case "Appetizers":
                            setMenu(productsPackage.slice(48, 53));
                            break;
                        case "Add Drop":
                            setMenu(productsPackage.slice(53, 56));
                            break;
                        case "Offerings":
                            setMenu(productsPackage.slice(56, 68));
                            break;
                        default:
                            return;
        }
    };
    return (
        <>
            <div className="w-full ml-60">
                <NavBar handleMenu={handleMenu} />
            </div>

            {menu.map((product) => (
                <Product key={product.id} order={order} product={product} />
            ))}
        </>
    );
}
