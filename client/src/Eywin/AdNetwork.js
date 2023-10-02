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
    // eslint-disable-next-line no-unused-vars
    const [loading,setLoading]=useState('Loading...');

    useEffect(() => {
        fetch(`/api/eywindashboard/adunits/${adUnitType}/${adNetwork}`)
            .then((data) => data.json())
            .then((a) => {
                if(a.length==0) setLoading('No Tag');
                setyesterday(a);
            });
        fetch(`/api/eywindashboard/adunits/${adUnitType}/${adNetwork}/daybefore`)
            .then((data) => data.json())
            .then((a) => {
                if(a.length==0) setLoading('No Tag');
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
            <h3 className="text-md text-lime-500">x {yesterday.length}</h3>
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
            <p className=" text-orange-500 text-sm">Yesterday Revenue:</p>
            {
                yesterday.length==0?<>
                    <p className="text-xs">{loading}</p>
                </>:  <p className="font-semibold">{Math.floor(calculateTotalRevenue(yesterday))} $</p>
            }
            <p className=" text-orange-500 text-sm">Day Before Revenue:</p>
            {
                dayBefore.length==0?<>
                    <p className="text-xs">{loading}</p>
                </>:  <p className="font-semibold">{Math.floor(calculateTotalRevenue(dayBefore))} $</p>
            }
            <div className="ml-8">
                <Button disabled={yesterday.length===0} size='xs' onClick={reset}>Reload</Button>
            </div>
        </Card>
    </>;
}
