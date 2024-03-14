import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  InputAdornment,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useForm, Controller, set } from "react-hook-form";
import { formatRut, validateRut, RutFormat } from "@fdograph/rut-utilities";
import RedirectPage from "@/components/RedirectPage";
import LoadingPage from "@/components/LoadingPage";
import Autocomplete from "@mui/material/Autocomplete";
import { TestCountriesV2 } from "@/components/Main/Main-Right/Form/Pais-Region-Provincia-Comuna/FixedDataV2";

type FormValues = {
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  prefijo: string;
  telefono: string;
  fechaNacimiento: Date;
  pais: string;
  region: string;
  provincia: string;
  comuna: string;
  calle: string;
  numero: number;
  monto: number;
  tipoDonacion: string;
  utmSource: string;
  utmMedium: string;
  utmContent: string;
  utmTerm: string;
  utmCampaign: string;
  titular: boolean;
  tarjetaHabienteRut: string;
  tarjetaHabienteNombre: string;
  response_url: string;
};

interface InputsProps {
  showMontoField: boolean;
  montoField: number;
  enableBirthdate: boolean;
  enableRegionProvinceCountry: boolean;
  enableAddressNumber: boolean;
  enableCardholderInfo: boolean;
  donationType: string;
  maxAmount: number;
  minAmount: number;
}
const Inputs: React.FC<InputsProps> = ({
  showMontoField,
  montoField,
  enableBirthdate,
  enableRegionProvinceCountry,
  enableAddressNumber,
  enableCardholderInfo,
  donationType,
  maxAmount,
  minAmount,
}) => {
  const form = useForm<FormValues>({
    defaultValues: {},
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClickDonar = () => {
    setIsButtonDisabled(true);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = form;

  const [paymentData, setPaymentData] = useState(null);
  const formRef = useRef(null); // Create a ref object for the form

  const onSubmit = async (data: FormValues) => {
    handleClickDonar();
    if (!showMontoField) {
      data.monto = montoField;
    }
    if (data.telefono !== undefined) {
      data.telefono = `9${data.telefono}`;
    }

    if (data.prefijo !== undefined && data.prefijo !== "") {
      data.rut = data.rut.replace(/\./g, "");
      data.titular = isCardHolder;
      data.tipoDonacion = donationType;
      if (data.pais === "") {
        data.pais = "Chile";
      } else {
        if (data.region !== "Otro País") {
          data.pais = "Chile";
        }
      }
      if (
        utmSource !== null &&
        utmMedium !== null &&
        utmContent !== null &&
        utmTerm !== null &&
        utmCampaign !== null
      ) {
        data.utmSource = utmSource;
        data.utmMedium = utmMedium;
        data.utmContent = utmContent;
        data.utmTerm = utmTerm;
        data.utmCampaign = utmCampaign;
      } else {
        alert("Error en la url, faltan parametros utm");
        return;
      }
      data.prefijo = data.prefijo.replace(/\+/g, "");
      data.response_url = response_url;

      // alert(JSON.stringify(data));
      try {
        console.log(data);
        const response = await axios
          .post(`${process.env.REACT_APP_API_URL}/inscripcion`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setPaymentData(response.data); // Set the response from the server to paymentData state
            console.log("Response from server:", response.data);
          })
          .catch((error) => {
            console.log(`Error desde el front ${error}`);

            alert(`${JSON.stringify(error.response.data)}`);
          });
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };
  const [isCardHolder, setIsCardHolder] = useState(false);

  const chileRegions =
    TestCountriesV2.find((country) => country.code === "CL")?.regions?.map(
      (region) => region
    ) || [];

  const countriesOnly = TestCountriesV2.map((country, index) => ({
    name: country.name,
    dial_code: country.dial_code,
    code: country.code,
    index,
  }));
  const defaultCountry = countriesOnly
    .map((country) => country)
    .find((country) => country.name === "Chile");
  //--------- Provincia
  // Find the selected region in "Chile"
  const selectedRegionWatch = watch("region");
  const selectedProvinciaWatch = watch("provincia");
  const selectedRegionFilter = TestCountriesV2.find(
    (country) => country.code === "CL"
  )?.regions?.find((region) => region.name === selectedRegionWatch);

 // extract and filter comunas bsed on the selected region through provinces
const selectedCommunes = selectedRegionFilter?.provinces?.flatMap(
  (province) => {
    let temp = province.communes.map((commune) => {
      return {
        code: commune.code,
        name: commune.name,
        province: province.name,
      }
    })
    return temp || []
  }
) || [];

  // // Extract and filter provinces based on the selected region
  // const selectedProvinces = selectedRegionFilter?.provinces || [];

  // Find the selected province within "Chile"
  const selectedProvinceV = TestCountriesV2.find(
    (country) => country.code === "CL"
  )
    ?.regions?.flatMap((region) => region.provinces || [])
    .find((province) => province.name === selectedProvinciaWatch);

  // Extract and filter communes based on the selected province
  //const selectedCommunes = selectedProvinceV?.communes || [];
  const [showPais, setShowPais] = useState<boolean>(false);
  useEffect(() => {
    if (selectedRegionWatch === "Otro País") {
      setValue("provincia", "");
      setValue("comuna", "");
      // setValue("pais", "");
      setShowPais(true);
    } else {
      setValue("pais", "Chile");
      setShowPais(false);
    }
  }, [selectedRegionWatch]);


  useEffect(() => {
    if (paymentData) {
      const formElement = document.getElementById(
        "webpayForm"
      ) as HTMLFormElement;
      if (formElement) {
        formElement.submit();
      }
    }
  }, [paymentData]);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  // Valores UTM
  const response_url = window.location.href.split("?")[0];
  
  const utmSource = query.get("utm_source");
  const utmMedium = query.get("utm_medium");
  const utmContent = query.get("utm_content");
  const utmTerm = query.get("utm_term");
  const utmCampaign = query.get("utm_campaign");
  // Valores de la url en pantalla loading
  const token = query.get("TBK_TOKEN");
  const transaccionId = query.get("TRANSACCION_ID");
  if (paymentData !== null) {
    return <RedirectPage paymentData={paymentData} />;
  }
  if (token !== null && transaccionId !== null) {
    return <LoadingPage />;
  }
  // Logica card holder



  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCardHolder(event.target.checked);
  };
  const validateMonto = (value: string | number) => {
    if (showMontoField) {
      const numericValue = parseInt(value.toString()); // Convert the input value to a number
      if (isNaN(numericValue)) {
        return "El monto debe ser un número válido";
      }
      if (numericValue < minAmount) {
        // Poner valores de check en el configurar
        return `El monto mínimo es de $CLP ${minAmount}`;
      }
      if (numericValue > maxAmount) {
        return `El monto máximo es de $CLP ${maxAmount}`;
      }
    }
    return true; // No validation when the checkbox is false
  };
  const validateNombreTarjetaHabiente = (value: string) => {
    if (isCardHolder) {
      if (!value) {
        return "El nombre del titular es requerido";
      }
      if (value.length > 100) {
        return "Máximo 100 caracteres";
      }
    }
    return true; // No validation when the checkbox is false
  };
  const validateRutTarjetaHabiente = (value: string) => {
    if (isCardHolder) {
      // Remover valores no numericos
      const numericValue = value;

      // Da formato al RUT
      const formattedValue = formatRut(numericValue, RutFormat.DOTS_DASH);

      // Update the field value with the formatted value using setValue
      setValue("tarjetaHabienteRut", formattedValue);
      const validatedRut = validateRut(formattedValue);

      if (validatedRut) {
        return true;
      } else {
        return "Rut invalido";
      }
    }
    return true; // No validation when the checkbox is false
  };

  return (
    <form noValidate ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      {/* Agregar validacion para que reciba el valor de los botones. */}
      <Collapse in={showMontoField}>
        <TextField
          required
          id="monto-required"
          label="Monto"
          {...register("monto", {
            validate: validateMonto,
          })}
          error={!!errors.monto}
          helperText={errors.monto?.message}
          fullWidth
          margin="normal"
          size="small"
          type="number"
          InputProps={{ style: { backgroundColor: "white" } }}
        />
      </Collapse>
      {enableCardholderInfo && (
        <>
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
              required={isCardHolder}
              id="nombreTarjetaHabiente-required"
              label="Nombre y Apellido del Tarjetahabiente."
              {...register("tarjetaHabienteNombre", {
                validate: validateNombreTarjetaHabiente,
              })}
              error={!!errors.tarjetaHabienteNombre}
              helperText={errors.tarjetaHabienteNombre?.message}
              margin="normal"
              size="small"
              fullWidth
              InputProps={{ style: { backgroundColor: "white" } }}
            />

            <TextField
              required={isCardHolder}
              id="rut-required"
              label="RUT del Tarjetahabiente"
              {...register("tarjetaHabienteRut", {
                validate: validateRutTarjetaHabiente,
              })}
              error={!!errors.tarjetaHabienteRut}
              helperText={errors.tarjetaHabienteRut?.message}
              margin="normal"
              size="small"
              fullWidth
              InputProps={{ style: { backgroundColor: "white" } }}
            />
          </Collapse>
        </>
      )}
      <TextField
        id="nombre-required"
        label="Nombre"
        type="text"
        {...register("nombre", {
          required: "El nombre es requerido",
          validate: {
            maxLength: (v) => v.length <= 100 || "Maximo 100 caracteres",
          },
        })}
        error={!!errors.nombre}
        helperText={errors.nombre?.message}
        // onChange={(e) => setNombre(e.target.value)}
        margin="normal"
        size="small"
        fullWidth
        InputProps={{ style: { backgroundColor: "white" } }}
      />
      <TextField
        id="apellido-required"
        label="Apellido"
        type="text"
        {...register("apellido", {
          required: "El apellido es requerido",
          validate: {
            maxLength: (v) => v.length <= 100 || "Maximo 100 caracteres",
          },
        })}
        error={!!errors.apellido}
        helperText={errors.apellido?.message}
        // onChange={(e) => setApellido(e.target.value)}
        fullWidth
        margin="normal"
        size="small"
        InputProps={{ style: { backgroundColor: "white" } }}
      />
      <TextField
        required
        id="rut-required"
        label="RUT"
        {...register("rut", {
          required: "El rut es requerido",
          validate: (value) => {
            // Remover valores no numericos
            const numericValue = value;

            // Da formato al RUT
            const formattedValue = formatRut(numericValue, RutFormat.DOTS_DASH);

            // Update the field value with the formatted value using setValue
            setValue("rut", formattedValue);
            const validatedRut = validateRut(formattedValue);

            if (validatedRut) {
              return true;
            } else {
              return "Rut invalido";
            }
          },
        })}
        error={!!errors.rut}
        helperText={errors.rut?.message}
        // onChange={(e) => setRut(e.target.value)}
        fullWidth
        margin="normal"
        size="small"
        type="text"
        InputProps={{ style: { backgroundColor: "white" } }}
      />
      <TextField
        id="email-required"
        label="Email"
        {...register("email", {
          required: "Email es requerido",
          validate: {
            maxLength: (v) => v.length <= 100 || "Maximo 100 caracteres",
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Email invalido",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        // onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        size="small"
        InputProps={{ style: { backgroundColor: "white" } }}
      />

      <Box marginTop="0.5rem">
        <Controller
          name="prefijo" // Specify the name for this field
          control={control} // Pass the control prop from useForm
          defaultValue={defaultCountry?.dial_code} // Set the default value here if needed
          rules={{ required: "Seleccione el prefijo" }} // Add validation rules
          render={({ field }) => (
            <Autocomplete
              id="country-select-demo"
              sx={{ width: "100%" }}
              options={countriesOnly}
              autoHighlight
              defaultValue={defaultCountry}
              getOptionLabel={(option) => option.dial_code}
              onChange={(_, value) => field.onChange(value.dial_code)} // Update the field value on change
              onBlur={() => field.onBlur()} // Handle onBlur event
              isOptionEqualToValue={(option, value) =>
                option.name === value.name && option.code === value.code
              }
              // value={field.value} // Set the value from the field
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    "& > img": { mr: 2, flexShrink: 0 },
                  }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option?.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option?.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option?.dial_code}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Elegir Prefijo"
                  fullWidth
                  error={!!errors.prefijo}
                  helperText={errors.prefijo?.message}
                  InputProps={{
                    ...params.InputProps,
                    autoComplete: "new-password",
                    style: { backgroundColor: "white" },
                  }}
                />
              )}
              freeSolo={false}
              disableClearable
            />
          )}
        />
      </Box>

      <TextField
        id="telefono-required"
        label="Teléfono"
        {...register("telefono", {
          required: "El teléfono es requerido",
          pattern: {
            value: /^\d+$/, // Use a regular expression to match only digits
            message: "Ingrese solo números en el teléfono",
          },
          maxLength: {
            value: 15,
            message: "El teléfono no debe tener más de 15 dígitos",
          },
        })}
        error={!!errors.telefono}
        helperText={errors.telefono?.message}
        // onChange={(e) => setTelefono(e.target.value)}
        fullWidth
        margin="normal"
        size="small"
        type="text"
        InputProps={{
          style: { backgroundColor: "white" },
          startAdornment: <InputAdornment position="start">9</InputAdornment>,
        }}
      />
      {enableBirthdate && (
        <>
          <TextField
            id="fechaDeNacimiento-required"
            label="Fecha de nacimiento"
            {...register("fechaNacimiento", {
              required: "La fecha de nacimiento es requerida",
              validate: {
                validAge: (value) => {
                  // Calcular edad
                  const birthDate = new Date(value);
                  const currentDate = new Date();
                  const age =
                    currentDate.getFullYear() - birthDate.getFullYear();

                  // Validar edad
                  if (age > 120 || age < 1) {
                    return "Fecha invalida";
                  }
                  return true;
                },
              },
            })}
            error={!!errors.fechaNacimiento}
            helperText={errors.fechaNacimiento?.message}
            // onChange={(e) => setFechaDeNacimiento(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }} // Shrink the label
            InputProps={{ style: { backgroundColor: "white" } }}
          />
        </>
      )}
      {enableRegionProvinceCountry && (
        <>
          <Box marginTop="0.5rem">
            <Controller
              name="region" // Specify the name for this field
              control={control} // Pass the control prop from useForm
              defaultValue="" // Set the default value here if needed
              rules={{ required: "Selecciona una región" }} // Add validation rules
              render={({ field }) => (
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  options={chileRegions}
                  autoHighlight
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => field.onChange(value.name)} // Update the field value on change
                  onBlur={() => field.onBlur()} // Handle onBlur event
                  // value={field.value} // Set the value from the field
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        "& > img": { mr: 2, flexShrink: 0 },
                      }}
                      {...props}
                    >
                      {option?.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Elegir región"
                      fullWidth
                      error={!!errors.region}
                      helperText={errors.region?.message}
                      InputProps={{
                        ...params.InputProps,
                        autoComplete: "new-password",
                        style: { backgroundColor: "white" },
                      }}
                    />
                  )}
                  freeSolo={false}
                  disableClearable
                />
              )}
            />
          </Box>
          {selectedRegionWatch !== "Otro País" &&
            selectedRegionWatch !== "" && (
              <Collapse in={!showPais}>
                {/* {<Box marginTop="0.5rem">
                  <Controller
                    name="provincia" // Specify the name for this field
                    control={control} // Pass the control prop from useForm
                    defaultValue="" // Set the default value here if needed
                    rules={{ required: "Selecciona una provincia" }} // Add validation rules
                    render={({ field }) => (
                      <Autocomplete
                        id="country-select-demo"
                        sx={{ width: "100%" }}
                        options={selectedProvinces}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => field.onChange(value.name)} // Update the field value on change
                        onBlur={() => field.onBlur()} // Handle onBlur event
                        // value={field.value} // Set the value from the field
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{
                              backgroundColor: "white",
                              display: "flex",
                              alignItems: "center",
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...props}
                          >
                            {option?.name}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Elegir provincia"
                            fullWidth
                            error={!!errors.provincia}
                            helperText={errors.provincia?.message}
                            InputProps={{
                              ...params.InputProps,
                              autoComplete: "new-password",
                              style: { backgroundColor: "white" },
                            }}
                          />
                        )}
                        freeSolo={false}
                        disableClearable
                      />
                    )}
                  />
                </Box>} */}

                <Box marginTop="0.5rem">
                  <Controller
                    name="comuna" // Specify the name for this field
                    control={control} // Pass the control prop from useForm
                    defaultValue="" // Set the default value here if needed
                    rules={{ required: "Selecciona una comuna" }} // Add validation rules
                    render={({ field }) => (
                      <Autocomplete
                        id="country-select-demo"
                        sx={{ width: "100%" }}
                        options={selectedCommunes}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => {
                          field.onChange(value.name);
                          setValue("provincia", value.province);
                          console.log(form.getValues());
                        }} // Update the field value on change
                        onBlur={() => field.onBlur()} // Handle onBlur event
                        // Set the value from the field
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{
                              backgroundColor: "white",
                              display: "flex",
                              alignItems: "center",
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...props}
                          >
                            {option.name}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Elegir comuna"
                            fullWidth
                            error={!!errors.comuna}
                            helperText={errors.comuna?.message}
                            InputProps={{
                              ...params.InputProps,
                              autoComplete: "new-password",
                              style: { backgroundColor: "white" },
                            }}
                          />
                        )}
                        freeSolo={false}
                        disableClearable
                      />
                    )}
                  />
                </Box>
              </Collapse>
            )}
          <Collapse in={showPais}>
            <Box marginTop="0.5rem">
              <Controller
                name="pais" // Specify the name for this field
                control={control} // Pass the control prop from useForm
                defaultValue="" // Set the default value here if needed
                rules={{ required: "Seleccione un pais" }} // Add validation rules
                render={({ field }) => (
                  <Autocomplete
                    id="country-select-demo"
                    sx={{ width: "100%" }}
                    options={countriesOnly}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    onChange={(_, value) => field.onChange(value.name)} // Update the field value on change
                    onBlur={() => field.onBlur()} // Handle onBlur event
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name && option.code === value.code
                    }
                    // value={field.value} // Set the value from the field
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{
                          backgroundColor: "white",
                          display: "flex",
                          alignItems: "center",
                          "& > img": { mr: 2, flexShrink: 0 },
                        }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${option?.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option?.code.toLowerCase()}.png 2x`}
                          alt=""
                        />
                        {option?.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Elegir País"
                        fullWidth
                        error={!!errors.pais}
                        helperText={errors.pais?.message}
                        InputProps={{
                          ...params.InputProps,
                          autoComplete: "new-password",
                          style: { backgroundColor: "white" },
                        }}
                      />
                    )}
                    freeSolo={false}
                    disableClearable
                  />
                )}
              />
            </Box>
          </Collapse>
        </>
      )}
      {/* Conditional view */}
      {enableAddressNumber && (
        <>
          <TextField
            id="direccion-required"
            label="Calle"
            {...register("calle", {
              required: "La calle es requerida",
              validate: {
                maxLength: (v) => v.length <= 250 || "Maximo 250 caracteres",
              },
            })}
            error={!!errors.calle}
            helperText={errors.calle?.message}
            // onChange={(e) => setDireccion(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            InputProps={{ style: { backgroundColor: "white" } }}
          />
          <TextField
            id="numero-required"
            label="Número"
            {...register("numero", {
              required: "El numero es requerido",
              validate: (value) => {
                const valueString = value.toString(); // Convert to a string
                if (valueString.length > 6) {
                  return "Maximo 6 digitos";
                } else {
                  return true;
                }
              },
            })}
            error={!!errors.numero}
            helperText={errors.numero?.message}
            // onChange={(e) => setNumero(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            type="number"
            InputProps={{ style: { backgroundColor: "white" } }}
          />
        </>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "0.5cm" }}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? "Procesando..." : "Donar"}
      </Button>
    </form>
  );
};

export default Inputs;
