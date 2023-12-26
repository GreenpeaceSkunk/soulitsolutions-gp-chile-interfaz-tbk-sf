import getClienteSF from "@/modules/cliente/getClienteSF";
import getTransaccionSF from "@/modules/transaccion/getTransaccionSF";
import authSF from "./api/post/authSF";
import createStagingSF from "./api/post/createStagingSF";
import updateTransaccionSF from "@/modules/transaccion/updateTransaccionSF";
import TransaccionStates from "@/modules/transaccion/enums/transaccionStates";
import updateClienteSF from "@/modules/cliente/updateClienteSF";
import ClienteStates from "@/modules/cliente/enums/clienteStates.enum";
import LogsEvents from "@/modules/logs/enums/logsEvents";
import sendEmail from "../email/sendEmail";
import createLog from "@/modules/logs/createLog";

async function generarStaging(idCliente: string, idTransaccion: string) {
  // Buscamos en la BD el cliente y la transaccion
  const cliente: Cliente = await getClienteSF(idCliente);
  const transaccion: Transaccion = await getTransaccionSF(idTransaccion);

  const generatedStaging = {
    cliente: cliente,
    transaccion: transaccion,
    correct: false,
  };
  if (cliente !== null && transaccion !== null) {
    generatedStaging.cliente = cliente;
    // Informacion cliente
    console.log(cliente);
    console.log(transaccion);
    //Informacion transaccion
    try {
      // 1er llamado de a la API de Salesforce Post "AUTH"
      const token = await authSF();
      console.log(`El token recibido es: ${token}`);
      // 2do llamado a la API de Salesforce post "generarStaging"

      if (token !== null) {
        const createStaging = await createStagingSF(
          token,
          cliente,
          transaccion
        );
        console.log(
          `Lo recibido del endpoint createStaging es: ${JSON.stringify(
            createStaging
          )}`
        );
        if (createStaging !== null && createStaging !== undefined) {
          await updateTransaccionSF(
            transaccion,
            TransaccionStates.CONFIRMADA_SF,
            createStaging.response.id
          );
          await updateClienteSF(cliente, ClienteStates.ACTIVO_SF);
          await createLog(
            transaccion.id,
            LogsEvents.CLIENTE_CREADO_EN_SALESFORCE,
            createStaging.request,
            createStaging.response
          );
          generatedStaging.transaccion.staging_ID = createStaging.response.id;
          generatedStaging.correct = true;
          return generatedStaging;
        } else {
          await updateTransaccionSF(transaccion, TransaccionStates.ERROR);
          await createLog(
            transaccion.id,
            LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO
          );
          console.log("El createStaging es null");
        }
      } else {
        await updateTransaccionSF(transaccion, TransaccionStates.ERROR);
        await createLog(
          transaccion.id,
          LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO
        );
      }
    } catch (error) {
      console.log("Error en generarStaging", error);
      await updateTransaccionSF(transaccion, TransaccionStates.ERROR);
      await createLog(
        transaccion.id,
        LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO
      );
    }
  }
  // Si no encuentra el cliente o la transaccion en la BD o algun error en el proceso
  return generatedStaging;
}

export default generarStaging;
