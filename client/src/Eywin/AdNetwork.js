import { useEffect, useState } from "react";
import { Card,Dropdown,Button } from 'flowbite-react';

export default function AdNetwork({adUnitType,adNetwork}) {
    const [yesterday,setyesterday]=useState([]);
    const [dayBefore,setdayBefore]=useState([]);
    // eslint-disable-next-line no-unused-vars
    const [seed, setSeed] = useState(1);
    const reset = () => {
        setSeed(Math.random());
    };

    useEffect(() => {
        fetch(`/api/eywindashboard/adunits/${adUnitType}/${adNetwork}`)
            .then((data) => data.json())
            .then((a) => {
                setyesterday(a);
            });
        fetch(`/api/eywindashboard/adunits/${adUnitType}/${adNetwork}/daybefore`)
            .then((data) => data.json())
            .then((a) => {
                setdayBefore(a);
            });
    }, [adUnitType]);

    const calculateTotalRevenue= (matchedItems)=>{
        let totalRevenue = 0;
        matchedItems.forEach(matchedItem => {
            totalRevenue += +matchedItem.estimated_revenue;
        });
        return totalRevenue;
    };

    return<>
        <Card>
            <h1 className="text-xl text-indigo-500">{adNetwork}</h1>
            <Dropdown
                floatingArrow={true}
                arrowIcon={true}
                label={adUnitType}
                inline
            >
                {yesterday.map((e, index) => (
                    <div key={index}>
                        <Dropdown.Item className="font-thin text-xs"  ><p className="text-xs font-extralight">{e.day}</p> {e.network_placement} <strong className="text-red-500 ml-2">Revenue:</strong> {e.estimated_revenue}$ </Dropdown.Item>
                    </div>
                ))}
                
            </Dropdown>
            <p className=" text-orange-500 text-sm">Yesterday Revenue:</p> <p className="font-semibold">{Math.floor(calculateTotalRevenue(yesterday))} $</p>
            <p className=" text-orange-500 text-sm">Day Before Revenue:</p> <p className="font-semibold">{Math.floor(calculateTotalRevenue(dayBefore))} $</p>
            <div className="ml-8">
                <Button size='xs' onClick={reset}>Reload</Button>
            </div>
        </Card>
    </>;
}
