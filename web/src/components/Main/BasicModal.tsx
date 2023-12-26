import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop"; // Import Backdrop

interface BasicModalProps {
  name?: string;
  transactionError?: boolean;
}
const BasicModal: React.FC<BasicModalProps> = ({ name, transactionError }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClose = () => {
    setOpen(false);
    navigate(`${location.pathname}${process.env.REACT_APP_WEB_HOME_UTM}`);
  };

  // Use useEffect to automatically open the modal when the component mounts
  useEffect(() => {
    handleOpen();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "#FFFFFF",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {name && name !== "" && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¡<span style={{ color: "#66CC00" }}>{name}</span>, muchas gracias
            por haber llegado hasta acá!
            <br />
            <br />
            Tu transacción ha sido realizada con éxito. Estaremos verificando el
            proceso en las próximas horas y, en caso de algún inconveniente, te
            contactaremos por correo electrónico.
            <br />
            <br />
            Gracias por confiar en nosotros.
            <br />
            Te enviamos un abrazo verde 💚
          </Typography>
        )}
        {transactionError && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¡Ups! tuvimos un inconveniente con tu donación, intenta nuevamente
            en unos minutos 😊
            <br />
            <br />
            Si el problema persiste, escríbenos{" "}
            <a href="mailto:socios@greenpeace.cl">aquí</a> y te ayudaremos con
            tu inscripción.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default BasicModal;
