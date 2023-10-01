import { useState } from "react";

import { Dropdown } from 'flowbite-react';
import { format } from "date-fns";
import Reklamup from "./Reklamup";
import Adsyield from "./Adsyield";
import Potensus from "./Potensus";
import A4G from "./A4G";
import Gravite from "./Gravite";

export default function NeronsDashboard() {

    const [adUnitType,setadUnitType]= useState('and_int');

    const onLogout = () => {
        fetch("/api/auth/logout", {
            method: "POST",
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.success) location.replace("/");
            });
    };

    const click = (adUnitType)=>{
        setadUnitType(adUnitType);
    };

    return (
        <>
            <div className="min-h-screen border-red-400 border-4 items-baseline flex  bg-indigo-200">
                <div className="flex flex-col justify-center max-h-min gap-10 m-10">
                    <h1 className="text-3xl underline underline-offset-4 text-orange-500">
                        Nerons GAM Dashboard
                    </h1>
                    <p className="text-xl">Today : {format(new Date(), "PP")}</p>
                    <div className="flex flex-row gap-5">
                        <Potensus adUnitType={adUnitType}/>
                        <A4G adUnitType={adUnitType}/>
                        <Reklamup adUnitType={adUnitType}/>
                        <Adsyield adUnitType={adUnitType}/>
                        <Gravite adUnitType={adUnitType}/>
                    </div>
                    <div className="flex-row">
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
                    </div>

                    <button className="hover:text-rose-600" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
