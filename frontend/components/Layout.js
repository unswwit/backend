import React, {useEffect} from "react";
// import NavBar from "./Navbar";
import Footer from "./Footer";
import {initGA, logPageView} from "../utils/GoogleAnalytics";
import MessengerCustomerChat from "react-messenger-customer-chat";

function hideFbChat() {
  useEffect(() => {
    const loadingScreenExists = document.getElementById("loadingBackground");
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    console.log(bottom)
    if (window.FB !== undefined && (!!loadingScreenExists || bottom)) {
      window.FB.CustomerChat.hide();
    } else if (window.FB !== undefined) {
      window.FB.CustomerChat.show(false);
    }
  }, []);
}

const Layout = ({children}) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true
    }
    logPageView();
  }, []);

  return <div>
    {/* <NavBar /> */}
    {children}
    <MessengerCustomerChat
      pageId={process.env.NEXT_PUBLIC_PAGE_ID}
      appId={process.env.NEXT_PUBLIC_APP_ID}
      onLoad={hideFbChat()}
    />
    <Footer />
  </div>;
}

export default Layout;
