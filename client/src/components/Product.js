import { useDispatch } from "react-redux";
import { addBasket, removeBasket } from "../redux/orderSlice";

export default function Product({ product, order }) {
    const dispatch = useDispatch();
    const basketItem = order.items.find((item) => item.id === product.id);

    const addBasketButton = () => {
        dispatch(
            addBasket({
                id: product.id,
                title: product.title,
                price: product.price,
                amount:1,
            })
        );
    };
    const removeBasketButton = () => {
        dispatch(
            removeBasket({
                id: product.id,
                title: product.title,
                price: product.price,
                amount: 1,
            })
        );
    };
    return (
        <>
            <div className="product w-80 inline-block bg-slate-100 font-medium text-lg text-center m-2 p-2 border-2 rounded-xl min-h-max">
                <h6 className="text-rose-600 text-xl font-bold">
                    {product.title}
                </h6>
                <div className="price font-medium ">
                    <h3>₺{product.price}</h3>
                </div>
                <div className="actions font-light mt-2">
                    <button
                        className="bg-transparent font-normal hover:bg-blue-500 text-blue-700  hover:text-white py-2  border border-blue-500 hover:border-transparent rounded w-24"
                        onClick={addBasketButton}
                    >
                        Add
                    </button>
                    <span className="amount m-4">
                        {(basketItem && basketItem.amount) || 0}
                    </span>
                    <button
                        disabled={!basketItem}
                        onClick={removeBasketButton}
                        className="bg-transparent font-normal enabled:hover:bg-rose-400
                        disabled:cursor-not-allowed text-blue-700  enabled:hover:text-white py-2  border border-blue-500 enabled:hover:border-transparent rounded w-24 "
                    >
                        Remove
                    </button>
                </div>
            </div>
        </>
    );
}
