import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import { Card, Button } from "flowbite-react";
import { cleanDate } from "../helpers";

export default function RecentOrders() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch("/api/order/recentorders")
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            });
    }, []);

    const deleteOrder = async (id) => {
        await fetch("/api/order/deleteorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then((data) => data.json())
            .then((newRecentOrders) => setOrders(newRecentOrders));
    };

    return (
        <>
            {orders.map((order, index) => (
                <div key={index} className="min-h-fit m-2 w-60">
                    <Card>
                        <h1 className="text-center text-xs">
                            Order {order._id.slice(0, 10)}
                        </h1>
                        <p className="text-center text-lg text-purple-400">{order.total} TL</p>
                        <OrderItem items={order.items} />
                        <p className="text-xs text-end italic">
                            {cleanDate(order.createdAt)}
                        </p>
                    </Card>
                    <Button
                        onClick={() => deleteOrder(order._id)}
                        color="failure"
                    >
                        Delete
                    </Button>
                </div>
            ))}
        </>
    );
}
