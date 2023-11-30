/*eslint no-unused-vars: "error"*/
import Total from "./components/Total";
import EndOfTheDay from "./components/EndOfTheDay";
import Basket from "./components/Basket";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import RecentOrders from "./components/RecentOrders";
import DropDownMenu from "./components/DropDownMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";


function App() {
    const order = useSelector((state) => state.order);

    return (
        <div className="bg-indigo-100 min-h-screen py-4">
            <div className="grid grid-cols-6 justify-items-center  gap-2 h-1/3 sticky  top-0 z-50 w-full border-solid border-y-red-600/50 border-b-2 py-2">
                <div className="col-start-1 col-end-2  row-start-1">
                    <DropDownMenu />
                </div>
                <div className="col-start-2 col-end-3">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className="col-start-3 col-end-5 w-30">
                    <Basket />
                </div>
                <div className="col-start-5 col-end-7 w-42 ">
                    <Total />
                </div>
            </div>
            <div className="flex w-full">
                <Routes>
                    <Route index element={<Menu order={order} />} />
                    <Route path="recent-orders" element={<RecentOrders />} />
                    <Route path="end-of-the-day" element={<EndOfTheDay />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
