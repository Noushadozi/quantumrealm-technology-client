import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const Main = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-338px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Main;