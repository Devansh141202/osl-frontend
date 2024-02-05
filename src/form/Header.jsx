import React from "react";
import logo1 from "../logo.png";

const Header = () => {
  return (
    <div>
      <nav class="navbar fixed-top navbar-light bg-light">
        <a class="navbar-brand" href="/">
          <img
            src={logo1}  
            style={{ height: "60px", marginLeft: "20px" }}
          />
        </a>
      </nav>
    </div>
  );
};

export default Header;
