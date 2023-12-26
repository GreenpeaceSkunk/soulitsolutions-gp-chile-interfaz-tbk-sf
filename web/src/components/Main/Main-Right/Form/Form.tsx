import React, { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import Inputs from "./Inputs";
import Amount from "./Amount";
import BasicModal from "../../BasicModal";
import { useLocation, useNavigate } from "react-router-dom";

interface FormProps {
  enableBirthdate: boolean;
  enableRegionProvinceCountry: boolean;
  enableAddressNumber: boolean;
  enableCardholderInfo: boolean;
  donationType: string;
  maxAmount: number;
  minAmount: number;
  amounts: Array<{ label: string; value: number }>;
  formTitle: string;
  formSubtitle: string;
}
const Form: React.FC<FormProps> = ({
  enableBirthdate,
  enableRegionProvinceCountry,
  enableAddressNumber,
  enableCardholderInfo,
  donationType,
  maxAmount,
  minAmount,
  amounts,
  formTitle,
  formSubtitle,
}) => {
  const [showMontoField, setShowMontoField] = useState(false);
  const [montoField, setMontoField] = useState(0);

  const location = useLocation();
  const { state } = location;
  const name = state?.name;
  const transactionError = state?.transactionError;

  return (
    <Container sx={{ p: 2, bgcolor: "#FFFFFF", textAlign: "center" }}>
      {name && name !== "" && <BasicModal name={name} />}
      {transactionError && <BasicModal transactionError={transactionError} />}
      {/* Your modal and other components */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="inherit" align="center" gutterBottom>
            {formTitle}
          </Typography>
          <Divider
            sx={{
              width: "100%",
              backgroundColor: "black",
              fontWeight: "bold",
            }}
          />
          <br />
          <Typography variant="caption" align="center" gutterBottom>
            {formSubtitle}
          </Typography>
          <br />
          <br />
          <Divider
            sx={{
              width: "100%",
              backgroundColor: "black",
              fontWeight: "bold",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" marginBottom={"10px"} align="center" mt={2}>
            Elige un monto:
            <br />
          </Typography>
          <Amount
            setShowMontoField={setShowMontoField}
            setMontoField={setMontoField}
            amounts={amounts}
          />
        </Grid>
        <Grid item xs={12}>
          <Inputs
            showMontoField={showMontoField}
            montoField={montoField}
            enableBirthdate={enableBirthdate}
            enableRegionProvinceCountry={enableRegionProvinceCountry}
            enableAddressNumber={enableAddressNumber}
            enableCardholderInfo={enableCardholderInfo}
            donationType={donationType}
            maxAmount={maxAmount}
            minAmount={minAmount}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Form;
