import { WidthFull } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router
const Logo: React.FC = () => {
  const homeUrl = `/${process.env.REACT_APP_WEB_HOME_UTM}`
  return (
    <Link to={homeUrl}>
      <img
        src="https://imagedelivery.net/4UjGyQauyQ4cqduHdPPkww/0261d8eb-b4de-4d2f-5c6c-1861021de500/public"
        alt="Main Logo"
        style={{ width: "20%", height: "auto" }}
      />
    </Link>
  );
};

export default Logo;
