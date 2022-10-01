import { moneyFormat } from "../helpers";
import Pay from "./Pay";
import { useSelector } from "react-redux";

export default function Total() {
    const order = useSelector((state) => state.order);
    return (
        <>
            <div className="flex-col w-80 text-fuchsia-600 text-5xl tracking-wide antialiased text-center font-medium">
                <div className="mb-10">Total {moneyFormat(order.total)}</div>
                <div className="ml-32 mb-6">
                    <Pay order={order} location={location} />
                </div>
            </div>
        </>
    );
}
