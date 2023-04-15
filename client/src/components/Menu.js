import Product from "./Product";
import NavBar from "./NavBar";
// import productsPackage from "../products.json";
import appetizers from "../appetizers.json";
import offerings from "../offerings.json";
import mustcoffee from "../mustcoffee.json";
import technical from "../technical.json";
import filtered from "../filtered.json";
import summerschool from "../summerschool.json";
import free from "../free.json";
import adddrop from "../adddrop.json";
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
