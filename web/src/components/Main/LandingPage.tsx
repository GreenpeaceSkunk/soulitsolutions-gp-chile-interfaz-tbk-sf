import React from "react";
import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
import Form from "./Main-Right/Form/Form";
import CssBaseline from "@mui/material/CssBaseline";
import Title from "./Main-Left/Title";
import Grid from "@mui/material/Grid";
import SubTitle from "./Main-Left/SubTitle";
import DescText from "./Main-Left/DescText";
import LandingPageProps from "../types/landingPageProps";
import Logo from "../Logo";

const theme_config = createTheme({
  palette: {
    primary: {
      main: "#66CC00", // Dark green color for Greenpeace
    },
    secondary: {
      main: "#003300", // Lighter green color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: "2.5rem",
      // fontWeight: 700,
      color: "#FFFFFF",
      marginBottom: "1rem",
    },
    h2: {
      fontSize: "2rem",
      // fontWeight: 600,
      color: "#FFFFFF",
      marginBottom: "1rem",
    },
    h3: {
      fontSize: "1.8rem",
      // fontWeight: 600,
      color: "#FFFFFF",
      marginBottom: "0.5rem",
    },
    h4: {
      fontSize: "1.5rem",
      // fontWeight: 600,
      color: "#FFFFFF",
      marginBottom: "0.5rem",
    },
    // body1: {
    //   fontSize: "1rem",
    //   color: "#333",
    //   marginBottom: "1rem",
    // },
  },
});
const LandingPage: React.FC<LandingPageProps> = ({
  enableBirthdate,
  enableRegionProvinceCountry,
  enableAddressNumber,
  enableCardholderInfo,
  donationType,
  maxAmount,
  minAmount,
  amounts,
  title,
  subtitle,
  descText,
  formTitle,
  formSubtitle,
  backgroundImage,
  ipcText,
}) => {
  return (
    <ThemeProvider theme={theme_config}>
      <CssBaseline />

      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          display: "flex",
          
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Grid
            container
            justifyContent="space-around"
            spacing={2}
            sx={{ padding: "30px" }}
          >
            <Grid
              item
              xs={3.5}
              sx={{}}
              container
              direction="column"
              // justifyContent="space-around"
              alignItems="center"
            >
              <Grid item xs={1.5} sx={{}}>
                <Logo />
                <br />
                <br />
                <Title title={title} />
                <SubTitle subtitle={subtitle} />
                <br />
                <DescText descText={descText} />
              </Grid>
            </Grid>
            <Grid item xs={3.5} sx={{}}>
              <Form
                enableBirthdate={enableBirthdate}
                enableRegionProvinceCountry={enableRegionProvinceCountry}
                enableAddressNumber={enableAddressNumber}
                enableCardholderInfo={enableCardholderInfo}
                donationType={donationType}
                maxAmount={maxAmount}
                minAmount={minAmount}
                amounts={amounts}
                formTitle={formTitle}
                formSubtitle={formSubtitle}
                ipcText={ipcText}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
