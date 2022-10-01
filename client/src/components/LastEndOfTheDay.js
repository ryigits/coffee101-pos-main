import { useState, useEffect } from "react";

export default function LastEndOfTheDay() {
    const [last, setLast] = useState({});

    useEffect(() => {
        fetch("/api/endoftheday/last")
            .then((data) => data.json())
            .then((last) => {
                setLast(last);
            });
    }, []);

    return (
        <>
            <div className="text-left">
                <div className="underline">Last one:</div>
                <div className="text-rose-500">
                    {last.tarih?.slice(0, 10)}
                </div>
                <div className="text-green-500">{last.cikisyapan}</div>
            </div>
        </>
    );
}
