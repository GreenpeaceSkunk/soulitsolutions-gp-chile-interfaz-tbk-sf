import React from "react";
import { Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
interface TitleProps {
  title: string;
}
const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <Box>
      <Typography
        variant="h1"
        // sx={{
        //   color: "white" /* Green */,
        //   fontWeight: "bold",
        //   fontSize: "3rem",
        //   textTransform: "uppercase",
        // }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Title;
