import React from "react";
import Logo from "../../assets/logo1.png"

import "./home.css";

const home = () => {
  return (
    <div className="Home">
      <div id="Box_Sub">
        <h1 id="Box_H1">Welcome to Auto Finder</h1>
        <p>( Admin Panel )</p>
        <div id="Box_Img">
          <img src={Logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default home;
