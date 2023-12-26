import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { relative } from "path";

const CardHolderCheckBox: React.FC = () => {
  const [isCardHolder, setIsCardHolder] = useState(false);
  const [nombreTarjetaHabiente, setNombreTarjetaHabiente] = useState("");
  const [rutTarjetaHabiente, setRutTarjetaHabiente] = useState("");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCardHolder(event.target.checked);
  };

  return (
    <Box position={"relative"}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isCardHolder}
            onChange={handleCheckboxChange}
            name="isCardHolder"
            color="primary"
          />
        }
        label="No soy el titular de la tarjeta con la que voy a realizar la donación."
      />

      <Collapse in={isCardHolder}>
        <TextField
          required
          id="nombreTarjetaHabiente-required"
          label="Nombre y Apellido del Tarjetahabiente."
          value={nombreTarjetaHabiente}
          onChange={(e) => setNombreTarjetaHabiente(e.target.value)}
          margin="normal"
          size="small"
          fullWidth
          InputProps={{ style: { backgroundColor: "white" } }}
        />

        <TextField
          required
          id="rut-required"
          label="RUT del Tarjetahabiente"
          value={rutTarjetaHabiente}
          onChange={(e) => setRutTarjetaHabiente(e.target.value)}
          margin="normal"
          size="small"
          fullWidth
          InputProps={{ style: { backgroundColor: "white" } }}
        />
      </Collapse>
    </Box>
  );
};

export default CardHolderCheckBox;
