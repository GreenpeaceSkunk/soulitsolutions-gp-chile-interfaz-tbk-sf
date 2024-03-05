import InscripcionDTO from "@/modules/inscripcion/dtos/inscripcionRequestDTO";
import {
  createTransaccionInscripcion,
  updateTransaccionInscripcion,
} from "../transaccion/transaccionInscripcion";
import TransaccionTypes from "@/modules/transaccion/enums/transaccionTypes";
import TransaccionStates from "../transaccion/enums/transaccionStates";
import LogsEvents from "@/modules/logs/enums/logsEvents";
import inscripcionTransbank from "./inscripcionTransbank";
import { error } from "console";
import { TRANSBANK } from "@/config/config";
import createLog from "../logs/createLog";
async function inscripcionNewCampaign(data: InscripcionDTO, cliente: any) {
  try {
    // Crea registro en tabla Transacciones
    const transaccionId = await createTransaccionInscripcion(
      TransaccionTypes.Inscripcion,
      TransaccionStates.CREADA,
      data,
      cliente
    );
    console.log(transaccionId);
    // Chequea si se creo correctamente la transaccion

    const reqLog = `${data.rut},${data.email}, ${TRANSBANK.RESPONSE_URL}?TRANSACCION_ID=${transaccionId}`;
    if (transaccionId !== null) {
      // Loguea transaccion creada correctamente

      createLog(
        transaccionId,
        LogsEvents.TRANSACCION_CREADA_CORRECTAMENTE,
        reqLog,
        null
      );
      // Se llama a la API de Transbank
      const response = await inscripcionTransbank(data, transaccionId); // TODO: HTTP RESPONSE
      console.log(response);
      console.log(new Date());
      if (response !== null) {
        // TODO Ver bien que devuelve Transbank para validar mas efectivamente
        const update = updateTransaccionInscripcion(
          transaccionId,
          TransaccionStates.INICIALIZADA,
          response
        );
        if (update !== null) {
          createLog(
            transaccionId,
            LogsEvents.TRANSACCION_INICIALIZADA,
            reqLog,
            response
          );
          return response;
        } else {
          createLog(
            transaccionId,
            LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO,
            reqLog,
            response
          );
          updateTransaccionInscripcion(
            transaccionId,
            TransaccionStates.ERROR,
            response
          );
          throw new Error("Error en la respuesta del servicio");
        }
      } else {
        updateTransaccionInscripcion(
          transaccionId,
          TransaccionStates.ERROR,
          response
        );
        createLog(
          transaccionId,
          LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO,
          reqLog,
          response
        );
        throw new Error("Error en la respuesta del servicio");
      }
    } else {
      throw error("Error al crear la transaccion");
    }
  } catch (error) {
    console.log(error);
  }
}

export default inscripcionNewCampaign;
