import React, {useEffect} from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import {initGA, logPageView} from "../utils/GoogleAnalytics";

const Layout = ({children}) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true
    }
    logPageView();
  }, []);

  return <div>
    <NavBar />
    {children}
    <Footer />
  </div>;
}

export default Layout;
