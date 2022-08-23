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
            <div className="text-center">
                Previous was on <div className="text-rose-500">{last.tarih}</div>
            </div>
        </>
    );
}
