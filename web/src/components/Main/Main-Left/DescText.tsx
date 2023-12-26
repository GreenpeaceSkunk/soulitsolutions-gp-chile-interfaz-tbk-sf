import React from "react";
import { Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
interface DescTextProps {
  descText: string;
}
const DescText: React.FC<DescTextProps> = ({ descText }) => {
  return (
    <Box >
      <Typography
        variant="subtitle1" // Choose the appropriate variant for your design
        sx={{
          color: "white",
          // Add other styles as needed, such as font size, font weight, etc.
        }}
      >
        {descText}
      </Typography>
    </Box>
  );
};

export default DescText;
