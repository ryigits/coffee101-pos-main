import BasketItem from "./BasketItem";
import { useSelector, useDispatch } from "react-redux";
import { resetBasket } from "../redux/orderSlice";
import productsPackage from "../products.json";
import { Button } from "flowbite-react";

export default function Basket() {
    const dispatch = useDispatch();
    const products = productsPackage; // needs to be fetch !!!
    const order = useSelector((state) => state.order);
    const resetBasketButton = () => {
        dispatch(resetBasket());
    };
    // console.log(order);

    return (
        <>
            <div className="flex justify-center">
                <div className="h-30 w-max px-3 rounded-md">
                    {order.items?.map((item) => (
                        <div key={item.id}>
                            <BasketItem
                                item={item}
                                product={products.find((p) => p.id === item.id)}
                            />
                        </div>
                    ))}
                </div>
                {order.items?.length > 0 && (
                    <div className="m-2">
                        <Button color="failure" size="lg" onClick={resetBasketButton}>
                            Reset
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
