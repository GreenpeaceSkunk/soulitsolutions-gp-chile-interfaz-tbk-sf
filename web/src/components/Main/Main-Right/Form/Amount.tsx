import React, { useEffect, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
interface AmountProps {
  setShowMontoField: React.Dispatch<React.SetStateAction<boolean>>;
  setMontoField: React.Dispatch<React.SetStateAction<number>>;
  amounts: Array<{ label: string; value: number }>;
}
const Amount: React.FC<AmountProps> = ({
  setShowMontoField,
  setMontoField,
  amounts,
}) => {
  const [selectedButton, setSelectedButton] = useState(amounts[1].label);
  useEffect(() => {
    setMontoField(amounts[1].value);
  }, []);

  const handleButtonClick = (buttonLabel: string) => {
    setSelectedButton(buttonLabel);
    if (buttonLabel === amounts[3].label) {
      setShowMontoField(true);
      setMontoField(amounts[3].value);
    } else {
      setShowMontoField(false);
      const otroMonto = amounts.find(
        (montoOption) => montoOption.label === buttonLabel
      ); // Access by label
      setMontoField(otroMonto?.value || 0);
    }
  };
  // const [showMontoField, setShowMontoField] = useState(false);

  // Show the Monto TextField when button4 is clicked

  return (
    <Grid container spacing={2}>
      {amounts.map((amount) => (
        <Grid item key={amount.label} xs={6} sm={3}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            style={{
              backgroundColor:
                selectedButton === amount.label ? "#66CC00" : "white",
              color: selectedButton === amount.label ? "white" : "#66CC00",
            }}
            onClick={() => handleButtonClick(amount.label)}
          >
            {amount.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Amount;
