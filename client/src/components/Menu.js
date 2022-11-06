import Product from "./Product";
import NavBar from "./NavBar";
import productsPackage from "../products.json";
import appetizers from "../appetizers.json";
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
                            setMenu(productsPackage.slice(24, 30));
                            break;
                        case "Filtered Coffee":
                            setMenu(productsPackage.slice(30, 35));
                            break;
                        case "Summer School":
                            setMenu(productsPackage.slice(35, 42));
                            break;
                        case "Free Electives":
                            setMenu(productsPackage.slice(42, 47));
                            break;
                        case "Appetizers":
                            setMenu(appetizers);
                            break;
                        case "Add Drop":
                            setMenu(productsPackage.slice(53, 56));
                            break;
                        case "Offerings":
                            setMenu(productsPackage.slice(56, 73));
                            break;
                        default:
                            return;
        }
    };
    return (
        <>
            <div className="w-full">
                <div className="ml-40">
                    <NavBar handleMenu={handleMenu} />
                </div>
                <div className="">
                    {menu.map((product) => (
                        <Product
                            key={product.id}
                            order={order}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
