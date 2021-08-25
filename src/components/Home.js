import axios from "axios";
import React from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import Main from "./Main";
import Footer from "./Footer";

const Home = () => {
  const cookie = document.cookie;
  const [access, refresh] = cookie.slice(cookie.indexOf("=") + 1).split("&");

  const listAccounts = async (access) => {
    const data = await axios.get(`/auth/list/${access}`);
    console.log("i got the data!!!", data);
  };

  const listCurrencies = async (access, refresh) => {
    const data = await axios.post(`/auth/currencies`, { access, refresh });
    console.log("i got the data!!!", data);
  };

  const fetchUserData = async (access) => {
    const data = await axios.get(`/auth/user/${access}`)
    console.log('USER DATA?!?!?', data)
  }

  const logKeys = () => {
      console.log('This is the access: ', access)
      console.log('this is the refresh: ', refresh)
  }

  return (
    <div className="blushDiv">
      <Navbar />
      <div><button onClick={() => fetchUserData(access)}>Show the user Data</button></div>
      <div><button onClick={() => listAccounts(access)}>Curl List Accounts</button></div>
      <div><button onClick={() =>listCurrencies(access, refresh)}>List Currencies</button></div>
      <div><button onClick={logKeys}>log keys</button></div>
      <div>
        <section class="section">
          <div class="columns">
            <SideNav />
            <Main />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
