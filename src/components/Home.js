import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import Main from "./Main";
import Footer from "./Footer";
import { connect } from "react-redux";

const Home = (props) => {

  console.log(props)
  return (
    <div className="blushDiv">
      <Navbar />
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

const mapState = (state) => {
  return {
    state
  };
};

export default connect(mapState)(Home)
