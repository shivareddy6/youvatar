import { Button, createTheme, ThemeProvider } from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";

function CustButton({
  disabled = false,
  label = "label",
  color = "primary",
  onClick = () => {
    console.log("clicked");
  },
  size = "large",
  background = "#3949AB",
  noPaddingLeft = false,
}) {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#3949AB",
        dark: "#3949AB",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
  });

  // console.log(background, "none", background === "none");
  return (
    <button
      disabled={disabled}
      style={{
        fontWeight: "600",
        // fontSize: size === "large" ? "16px" : "14px",
        lineHeight: "24px",
        color: background !== "none" ? "white" : "#3949AB",
        background: disabled ? "grey" : background,
        borderRadius: "4px",

        // padding: (size === "large") ? "12px 49px" : "10px 30px",
        // paddingLeft: noPaddingLeft ? "1px" : "none",
      }}
      className={
        "text-sm xs:text-base border-2 border-[#3949AB] " +
        (noPaddingLeft
          ? "px-2 py-1 "
          : "px-[20px] py-[7px] xs:px-[49px] xs:py-[12px]")
      }
      onClick={onClick}
    >
      <p className="text-xs xs:text-base">{label}</p>
    </button>
  );
}

export default CustButton;
