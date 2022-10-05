import { useEffect, useState } from "react";

import MostSold from "./components/MostSold";
import { format } from "date-fns";

export default function Admin() {
    const [currentRevenueOdtu, setCurrentRevenueOdtu] = useState(null);
    const [currentRevenueYuzyil, setCurrentRevenueYuzyil] = useState(null);
    const [coffeeConsumeGr, setCoffeeConsumeGr] = useState(null);
    useEffect(() => {
        fetch("/api/order/currentrevenueodtu")
            .then((data) => data.json())
            .then((revenue) => {
                setCurrentRevenueOdtu(revenue);
            });
        fetch("/api/order/currentrevenueyuzyil")
            .then((data) => data.json())
            .then((revenue) => {
                setCurrentRevenueYuzyil(revenue);
            });
        fetch("/api/order/coffeeconsume")
            .then((data) => data.json())
            .then((gr) => {
                setCoffeeConsumeGr(gr);
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
                    <p className="text-2xl font-medium">
                        ODTU : {currentRevenueOdtu} TL
                    </p>
                    <p className="text-2xl font-medium">
                    Yuzyil : {currentRevenueYuzyil} TL
                    </p>
                    <button className="hover:text-rose-600" onClick={onLogout}>
                        Logout
                    </button>
                </div>
                <div className="col-start-2 col-end-4 row-start-1 row-end-2 flex flex-wrap h-10 text-2xl font-light mt-12">
                    <p>Tuketilen Gunluk Kahve Miktari:</p>
                    <p className="text-orange-500 font-normal ml-2">{coffeeConsumeGr}</p>
                    <p className="ml-1">gr </p>
                </div>
                <div className="col-start-1 bg-amber-200 col-end-4 row-start-2 row-end-4 flex flex-wrap border-purple-500 border-2 text-xs">
                    <MostSold />
                </div>
            </div>
        </>
    );
}
