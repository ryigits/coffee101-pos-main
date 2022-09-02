import { useEffect, useState } from "react";
import { Card} from "flowbite-react";


export default function MostSold() {
    const [mostSoldArray, setMostSoldArray] = useState([]);

    useEffect(() => {
        fetch("/api/order/mostsold")
            .then((data) => data.json())
            .then((mostSoldArray) => setMostSoldArray(mostSoldArray));
    }, []);

    return (
        <>
            {mostSoldArray?.map((item) => (
                <div key={item.id} className="w-24 m-1 h-48">
                    <Card>
                        <h1 className="h-10 font-medium">{item.title}</h1>
                        <p className="text-xl text-orange-600">{item.amount}</p>
                    </Card>
                </div>
            ))}
        </>
    );
}
