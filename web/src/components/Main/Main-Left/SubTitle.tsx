import React from "react";
import { Typography, Box, withTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
interface SubTitleProps {
  subtitle: string;
}
const SubTitle: React.FC<SubTitleProps> = ({ subtitle }) => {
  return (
    <Box>
      <Typography
        variant="h5" // Choose the appropriate variant for your design
        dangerouslySetInnerHTML={{ __html: subtitle }}
        sx={{
          color: "white",
          whiteSpace: "break-spaces",
          width: "150%",
          // Add other styles as needed, such as font size, font weight, etc.
        }}
      />
    </Box>
  );
};

export default SubTitle;
