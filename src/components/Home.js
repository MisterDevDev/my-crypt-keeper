import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import Main from "./Main";
import Footer from "./Footer";
import { connect } from "react-redux";

const Home = (props) => {
  // const cookie = document.cookie;
  // const [access, refresh] = cookie.slice(cookie.indexOf("=") + 1).split("&");

  // const listAccounts = async (access) => {
  //   const data = await axios.get(`/auth/list/${access}`);
  //   console.log("i got the data!!!", data);
  // };

  // const listCurrencies = async (access, refresh) => {
  //   const data = await axios.post(`/auth/currencies`, { access, refresh });
  //   console.log("i got the data!!!", data);
  // };

  // const fetchUserData = async (access) => {
  //   const data = await axios.get(`/auth/user/${access}`)
  //   console.log('USER DATA?!?!?', data)
  // }

  // const logKeys = () => {
  //     console.log('This is the access: ', access)
  //     console.log('this is the refresh: ', refresh)
  // }

  const [coinbaseData, setCoinbaseData] = useState(() => [])

  useEffect(() => fetchCoinbaseData(), [])
  
  async function fetchCoinbaseData() {
    try {
      if(props.state.auth.id){
      const data = await axios.get(`/auth/user/${props.state.auth.id}`)
      setCoinbaseData(data)
      console.log('Look at the data!!', data)
      }
    } catch (error) {
      console.log(error)
    }
  } 
  console.log(props)
  return (
    <div className="blushDiv">
      <Navbar />
      <div>
      <button onClick={() => fetchCoinbaseData()}>MY BUTTON</button>
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

const mapState = (state) => {
  return {
    state
  };
};

export default connect(mapState)(Home)
