import Header from "../Header/header";
import Footer from "../Footer/footer";
import {Outlet} from "react-router-dom";
import Scroll from "../../Scroll";
function OutletWrapper() {
    return (
        <>
            <Header />
            <Scroll />
            <Outlet />
            <Footer />
        </>
    );
}

export default OutletWrapper