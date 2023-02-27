import { Button } from "@mui/material";
import React from "react";
import logo from "../assets/Youvatar.png";
import style, { button } from "../style";
import CustButton from "./custButton";

const Navbar = () => {
  return (
    <nav className="flex py-6 justify-end xs:justify-between items-center navbar p-5">
      <div className="xs:flex hidden justify-between items-center flex-1">
        <img src={logo} style={{ height: "36px", width: "236px" }} />
        <CustButton className="w-20" label="Save Draft" />
      </div>

      {/* <CustButton label="Save Draft" /> */}
      <div className="xs:hidden">
        <CustButton style={{ width: "20px !important" }} label="Save Draft" />
      </div>
    </nav>
  );
};

export default Navbar;
