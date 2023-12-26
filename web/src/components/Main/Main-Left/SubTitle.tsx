import React from "react";
import { Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
interface SubTitleProps {
  subtitle: string;
}
const SubTitle: React.FC<SubTitleProps> = ({ subtitle }) => {
  return (
    <Box>
      <Typography
        variant="h5" // Choose the appropriate variant for your design
        sx={{
          color: "white",
          // Add other styles as needed, such as font size, font weight, etc.
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default SubTitle;
