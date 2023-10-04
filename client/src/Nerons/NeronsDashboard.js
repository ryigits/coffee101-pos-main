import { useState, useEffect } from 'react';
import { Dropdown } from 'flowbite-react';
import { format } from 'date-fns';
import Console from './Console';
import { DayPicker } from 'react-day-picker';

export default function NeronsDashboard() {
    const [isMounted, setIsMounted] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [grupedData, setGrupedData] = useState([]);
    const [adUnitType, setAdUnitType] = useState('and_int');
    const [selectedDay, setSelectedDay] = useState(new Date(new Date().valueOf() - 1000 * 60 * 60 * 12)); 

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        };
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        let day = format(new Date(selectedDay), 'yyyy-MM-dd');
        setIsLoading(true);
        fetch(`/api/neronsdashboard/${adUnitType}/${day}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((data) => data.json())
            .then((a) => {
                setGrupedData(a);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [selectedDay, adUnitType, isMounted]);

    const footer = selectedDay ? (
        <p className='text-xl text-indigo-600 ml-10'>{format(selectedDay, 'PP')} Selected</p>
    ) : (
        <p>Please pick a day.</p>
    );

    const onLogout = () => {
        fetch('/api/auth/logout', {
            method: 'POST',
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.success) location.replace('/');
            });
    };

    const click = (adUnitType) => {
        setAdUnitType(adUnitType);
    };

    return (
        <>
            <div className="min-h-screen bg-indigo-200 p-10">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-4">
                        <Dropdown
                            floatingArrow={true}
                            arrowIcon={true}
                            label={adUnitType}
                            color="warning"
                        >
                            <Dropdown.Item className="font-thin text-xs"  onClick={()=>click('and_int')}>Android Interstitial</Dropdown.Item>
                            <Dropdown.Item className="font-thin text-xs"  onClick={()=>click('and_rw')}>Android Rewarded</Dropdown.Item>
                            <Dropdown.Item className="font-thin text-xs"  onClick={()=>click('ios_int')}>IOS Interstitial</Dropdown.Item>
                            <Dropdown.Item className="font-thin text-xs"  onClick={()=>click('ios_rw')}>IOS Rewarded</Dropdown.Item>
                            <Dropdown.Item className="font-thin text-xs"  onClick={()=>click('low_tier_int')}>Low Tier Interstitial</Dropdown.Item>
                            <Dropdown.Item className="font-thin text-xs"  onClick={()=>click('low_tier_rw')}>Low Tier Rewarded</Dropdown.Item>
                        </Dropdown>

                        {isLoading ? (
                            <p className="text-xl font-medium text-amber-500">Loading...</p>
                        ) : (
                            <div className="mt-4">
                                <Console data={grupedData} />
                            </div>
                        )}
                    </div>
                    <div className="md:w-1/2 p-4">
                        <h1 className="text-3xl flex underline underline-offset-4 text-orange-500">Nerons GAM Dashboard</h1>
                        <button className="hover:text-rose-600 text-lg float-right" onClick={onLogout}>Logout</button>
                        <DayPicker
                            mode="single"
                            required
                            selected={selectedDay}
                            onSelect={setSelectedDay}
                            footer={footer}
                        />
                        
                    </div>
                </div>


            </div>

        </>
    );
}


