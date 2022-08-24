import { useEffect, useState } from "react";
import RecentOrders from "./components/RecentOrders";
import { format } from "date-fns";

export default function Admin() {
    const [currentRevenue, setCurrentRevenue] = useState(null);
    useEffect(() => {
        fetch("/api/order/currentrevenue")
            .then((data) => data.json())
            .then((revenue) => {
                setCurrentRevenue(revenue);
            });
    }, []);

    const onLogout = () => {
        fetch("/api/auth/logout", {
            method: "POST",
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.success) location.replace("/");
            });
    };

    return (
        <>
            <div className="grid grid-cols-3 grid-rows-3 min-h-screen border-red-400 border-4 bg-indigo-200">
                <div className="col-span-1 row-start-1 row-end-2 flex flex-col max-h-min items-start justify-center gap-4 ml-4">
                    <h1 className="text-2xl underline underline-offset-4 text-orange-500">
                        Coffee101 Monitor
                    </h1>
                    <p>{format(new Date(), "PP")}</p>
                    <p className="text-3xl font-medium">
                        Current Revenue: {currentRevenue} TL
                    </p>
                    <button className="hover:text-rose-600" onClick={onLogout}>Logout</button>
                </div>

                <div className="col-start-1 col-end-4 row-start-2 row-end-4 max-h-min flex border-purple-500 border-2">
                    <RecentOrders />
                </div>
            </div>
        </>
    );
}
