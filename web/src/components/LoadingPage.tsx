import React, { useEffect, useState, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "react-hook-form";
import { Modal } from "@mui/material";

const LoadingPage: React.FC = () => {
  const location = useLocation();
  const [lastJson, setLastJson] = useState<any | null>(null);
  const navigate = useNavigate();
  const isMounted = useRef(true);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const response = async () => {
    let redirect_endpoint = "/";
    try {
      const call = await axios
        .post(
          `${process.env.REACT_APP_API_URL}/inscripcion/confirmar`,
          {
            token: token,
            transaccionId: transaccionId,
          },
          {
            headers: {
              "Content-Type": "application/json", // Fundamental
            },
          }
        )
        .then((response) => {
          setLastJson(response.data.data);
          if(response.data.data.tipo_donacion == "One off"){
            redirect_endpoint = "/unica";
          }
          if (response.data.data.response_code == 0) {
            
            navigate(redirect_endpoint, {
              state: { name: response.data.name },
            });
          } else {
            navigate(redirect_endpoint, {
              state: { transactionError: true },
            });
          }
        })
        .catch((error) => {
          navigate(redirect_endpoint, {
            state: { transactionError: true },
          });
          console.log(`Error desde el front ${error}`);
        });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  let query = useQuery();
  const token = query.get("TBK_TOKEN");
  const transaccionId = query.get("TRANSACCION_ID");

  useEffect(() => {
    // This code will only run once when the component mounts

    const timer = setTimeout(() => {
      if (token != null && lastJson === null) {
        response();
      } else {
        console.log("Entro al timer pero no se hace nada");
      }
    }, 30);

    return () => {
      // This cleanup function will run when the component unmounts

      isMounted.current = false;
      clearTimeout(timer);
      // Perform any cleanup or resource releasing tasks
    };
  }, []);

  return (
    <div>
      <CircularProgress sx={{ marginTop: "10px" }} />
    </div>
  );
};

export default LoadingPage;
