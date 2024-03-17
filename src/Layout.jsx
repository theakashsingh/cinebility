import Header from "./pages/header/Header"
import Footer from "./pages/footer/Footer"
import { Outlet } from "react-router-dom";

const Layout = () => {
  return <>
        <Header/>
            <Outlet/>
        <Footer/>
  </>;
};

export default Layout;
