import { useEffect, useState } from "react";
import { Card,Dropdown } from 'flowbite-react';
export default function Adsyield({adUnitType}) {
    const [responseData,setResponseData]=useState([]);
    useEffect(() => {
        fetch(`/api/neronsdashboard/adunits/${adUnitType}/adsyield`)
            .then((data) => data.json())
            .then((a) => {
                setResponseData(a);
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
            <h1 className="text-xl text-purple-500">ADSYIELD</h1>
            <Dropdown
                floatingArrow={true}
                arrowIcon={true}
                label={adUnitType}
                inline
            >
                {responseData.map((e, index) => (
                    <div key={index}>
                        <Dropdown.Item className="font-thin text-xs"  ><p className="text-xs font-extralight">{e.day}</p> {e.network_placement} <strong className="text-red-500 ml-2">Revenue:</strong> {e.estimated_revenue}$ </Dropdown.Item>
                    </div>
                ))}
                
            </Dropdown>
            <p className=" text-orange-500 text-sm">Total Revenue:</p> <p className="font-semibold">{Math.floor(calculateTotalRevenue(responseData))} $</p>
        </Card>
    </>;
}
