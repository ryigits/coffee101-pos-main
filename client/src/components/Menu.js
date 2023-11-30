import Product from "./Product";
import NavBar from "./NavBar";
import appetizers from "../jsons/appetizers.json";
import offerings from "../jsons/offerings.json";
import mustcoffee from "../jsons/mustcoffee.json";
import technical from "../jsons/technical.json";
import filtered from "../jsons/filtered.json";
import summerschool from "../jsons/summerschool.json";
import free from "../jsons/free.json";
import adddrop from "../jsons/adddrop.json";
import productsFavourites from "../jsons/productsFavourites.json";
import { useState } from "react";

export default function Menu({ order }) {
    const [menu, setMenu] = useState(productsFavourites);
    const handleMenu = (type) => {
        switch (type) {
                        case "Favourites":
                            setMenu(productsFavourites);
                            break;
                        case "Must Coffee":
                            setMenu(mustcoffee);
                            break;
                        case "Technical Electives":
                            setMenu(technical);
                            break;
                        case "Filtered Coffee":
                            setMenu(filtered);
                            break;
                        case "Summer School":
                            setMenu(summerschool);
                            break;
                        case "Free Electives":
                            setMenu(free);
                            break;
                        case "Appetizers":
                            setMenu(appetizers);
                            break;
                        case "Add Drop":
                            setMenu(adddrop);
                            break;
                        case "Offerings":
                            setMenu(offerings);
                            break;
                        default:
                            return;
        }
    };
    return (
        <>
            <div className="w-full">
                <div className="flex justify-center">
                    <NavBar handleMenu={handleMenu} />
                </div>
                <div className="flex flex-wrap justify-center">
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
