import authSF from "../inscripcion/salesforce/api/post/authSF";
import getPagos from "./api/get/getPagos";
import checkCreateRecords from "./checkCreateRecords";
import sendEmail from "../inscripcion/email/sendEmail";
import {
  errorEmailRecipient,
  errorEmailSubject,
} from "./email/errorEmailTemplate";
import sendEmailError from "./email/sendEmailError";
import getPagosOneOff from "./api/get/getPagosOneOff";
import checkCreateRecordsOO from "./checkCreateRecordsOO";

const createScheduledAppRG = async () => {
  // Implementation here
  try {
    // Obtencion del token
    const token = await authSF();
    if (!token) {
      console.log("No se recibió token");
      throw new Error(
        `Error al obtener token de Salesforce, para la scheduled app de RG.`
      );
    }

    console.log(`El token recibido es: ${token}`);

    const responsePagos = await getPagos(token);
    const confirmedRecords = checkCreateRecords(token, responsePagos);
    return confirmedRecords;
  } catch (error) {
    console.error(error);

    sendEmailError(error);
    console.log("Ocurrio un error en la ejecucion del createScheduledAppRG.");
    return null;
  }
};

const createScheduledAppOO = async () => {
  // Implementation here
  try {
    // Obtencion del token
    const token = await authSF();
    if (!token) {
      console.log("No se recibió token");
      throw new Error(
        `Error al obtener token de Salesforce, para la scheduled app de OO.`
      );
    }

    console.log(`El token recibido es: ${token}`);
    // Get transacciones de SF
    const responsePagosOO = await getPagosOneOff(token);
    // iterate over responsePagosOO

    // Iterar sobre las transacciones, confirmarlas con TBK y modificar transaccion en SF.
    const confirmedRecordsOO = checkCreateRecordsOO(token, responsePagosOO);
    return confirmedRecordsOO;
  } catch (error) {
    console.error(error);

    sendEmailError(error);
    console.log("Ocurrio un error en la ejecucion del createScheduledAppOO.");
    return null;
  }
};

export { createScheduledAppRG, createScheduledAppOO };
